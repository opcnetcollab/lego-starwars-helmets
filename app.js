/**
 * app.js — Lego Star Wars Helmets
 * Logique de chargement, rendu et filtrage des casques
 * Vanilla JS · ES6+ · Aucune dépendance externe
 */

'use strict';

// ============================================================
// État de l'application
// ============================================================

const state = {
  helmets: [],          // Données brutes chargées depuis le JSON
  filters: {
    series: 'all',      // Filtre série actif
    side: 'all',        // Filtre côté de la Force actif
    search: ''          // Texte de recherche actif
  }
};

// ============================================================
// Références DOM
// ============================================================

const grid          = document.getElementById('helmets-grid');
const countEl       = document.getElementById('helmet-count');
const emptyState    = document.getElementById('empty-state');
const loadingSpinner = document.getElementById('loading-spinner');
const searchInput   = document.getElementById('search-input');

// ============================================================
// Utilitaires
// ============================================================

/**
 * Retourne le libellé humain du côté de la Force
 * @param {'light'|'dark'} side
 * @returns {string}
 */
function getSideLabel(side) {
  return side === 'light' ? 'Côté Lumineux' : 'Côté Obscur';
}

/**
 * Applique les filtres actifs (série, côté, recherche) à la liste complète
 * @returns {Array} Casques filtrés
 */
function getFilteredHelmets() {
  const { series, side, search } = state.filters;
  const query = search.trim().toLowerCase();

  return state.helmets.filter(helmet => {
    const matchSeries = series === 'all' || helmet.series === series;
    const matchSide   = side   === 'all' || helmet.side   === side;
    const matchSearch = !query || helmet.name.toLowerCase().includes(query);
    return matchSeries && matchSide && matchSearch;
  });
}

// ============================================================
// Spinner
// ============================================================

function showSpinner() {
  loadingSpinner.classList.remove('hidden');
  grid.classList.add('hidden');
  emptyState.classList.add('hidden');
}

function hideSpinner() {
  loadingSpinner.classList.add('hidden');
}

// ============================================================
// Rendu — Création d'une carte casque
// ============================================================

/**
 * Crée et retourne l'élément DOM d'une carte casque
 * @param {Object} helmet   — données du casque
 * @param {number} index    — index dans la liste filtrée (pour le stagger)
 * @returns {HTMLElement}
 */
function createHelmetCard(helmet, index) {
  const article = document.createElement('article');
  article.className = 'helmet-card';
  article.setAttribute('aria-label', helmet.name);

  // Délai d'animation staggeré : max ~0.6s pour que ça reste fluide
  const delay = Math.min(index * 0.06, 0.6);
  article.style.setProperty('--delay', `${delay}s`);

  const sideClass = helmet.side === 'light' ? 'badge-side--light' : 'badge-side--dark';
  const sideLabel = getSideLabel(helmet.side);

  article.innerHTML = `
    <div class="helmet-card__image-wrap">
      <img
        class="helmet-card__image"
        src="${helmet.image_url}"
        alt="${helmet.name} — Set ${helmet.set_number}"
        loading="lazy"
        width="300"
        height="300"
        onerror="this.src='https://placehold.co/300x300/1a1a2e/ffe81f?text=${helmet.set_number}'"
      />
      <span class="badge-side ${sideClass}" aria-label="${sideLabel}">${sideLabel}</span>
      <span class="badge-year">${helmet.year}</span>
    </div>
    <div class="helmet-card__body">
      <h2 class="helmet-card__name">${helmet.name}</h2>
      <div class="helmet-card__meta">
        <span class="helmet-card__set">#${helmet.set_number}</span>
      </div>
      <div class="badge-series">${helmet.series}</div>
    </div>
  `;

  return article;
}

// ============================================================
// Rendu — Grille complète
// ============================================================

/**
 * Vide la grille et injecte les cartes correspondant aux filtres actifs.
 * Met à jour le compteur et affiche/masque l'état vide.
 */
function renderGrid() {
  const filtered = getFilteredHelmets();

  // Vider la grille
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Fragment pour un seul reflow DOM
  const fragment = document.createDocumentFragment();
  filtered.forEach((helmet, idx) => {
    fragment.appendChild(createHelmetCard(helmet, idx));
  });
  grid.appendChild(fragment);

  // Compteur
  countEl.textContent = filtered.length;

  // État vide
  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    grid.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');
  }
}

// ============================================================
// Filtres — Gestion des clics et de la recherche
// ============================================================

/**
 * Initialise les écouteurs sur les boutons de filtre et la recherche.
 */
function initFilters() {
  // Délégation d'événements sur la section filtres (boutons)
  document.querySelector('.filters-section').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filterType  = btn.dataset.filter; // 'series' ou 'side'
    const filterValue = btn.dataset.value;

    state.filters[filterType] = filterValue;

    // Mettre à jour l'état visuel des boutons du groupe
    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(sibling => {
      sibling.classList.toggle('active', sibling === btn);
    });

    renderGrid();
  });

  // Recherche en temps réel
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.filters.search = searchInput.value;
      renderGrid();
    });
  }
}

// ============================================================
// Chargement des données
// ============================================================

/**
 * Charge le JSON des casques et démarre l'application.
 */
async function loadHelmets() {
  showSpinner();

  try {
    const response = await fetch('./data/helmets.json');

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} lors du chargement de helmets.json`);
    }

    state.helmets = await response.json();

    // Tri par année (plus récent en premier), puis par nom
    state.helmets.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name, 'fr'));

    hideSpinner();
    renderGrid();

  } catch (error) {
    console.error('[Lego Helmets] Impossible de charger les données :', error);

    hideSpinner();

    grid.classList.remove('hidden');
    grid.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        color: #ef5350;
        font-family: var(--font-title, monospace);
        padding: 3rem;
      ">
        ⚠️ Erreur de chargement des casques.<br>
        <small style="color:#8888aa;">${error.message}</small>
      </p>
    `;
    countEl.textContent = 0;
  }
}

// ============================================================
// Point d'entrée
// ============================================================

function init() {
  initFilters();
  loadHelmets();
}

document.addEventListener('DOMContentLoaded', init);
