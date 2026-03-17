/**
 * app.js — Lego Star Wars Helmet Collection
 * Refonte Cinématique 2024 — Design System v1.0
 * Vanilla JS · ES6+ · Aucune dépendance
 */

'use strict';

// ============================================================
// État de l'application
// ============================================================
const state = {
  helmets: [],
  filters: {
    series: 'all',
    side:   'all',
    search: ''
  }
};

// ============================================================
// Références DOM
// ============================================================
const grid           = document.getElementById('helmets-grid');
const countEl        = document.getElementById('helmet-count');
const heroCountEl    = document.getElementById('hero-count');
const emptyState     = document.getElementById('empty-state');
const loadingSpinner = document.getElementById('loading-spinner');
const searchInput    = document.getElementById('search-input');
const resetBtn       = document.getElementById('reset-filters');

// ============================================================
// Utilitaires
// ============================================================

function getSideLabel(side) {
  return side === 'light' ? '💡 Lumineux' : '🔴 Obscur';
}

function getSideClass(side) {
  return side === 'light' ? 'badge-side-pill--light' : 'badge-side-pill--dark';
}

/**
 * Mappe le nom de série vers la clé CSS data-series
 */
function getSeriesKey(series) {
  const map = {
    'Trilogie Originale': 'original',
    'Prélogie':           'prequel',
    'Trilogie Sequel':    'sequel',
    'The Mandalorian':    'mando',
    'The Clone Wars':     'clone-wars',
    'Divers':             'divers',
  };
  return map[series] || 'divers';
}

/**
 * Applique les filtres actifs sur la liste complète
 */
function getFilteredHelmets() {
  const { series, side, search } = state.filters;
  const query = search.trim().toLowerCase();

  return state.helmets.filter(h => {
    const ms = series === 'all' || h.series === series;
    const md = side   === 'all' || h.side   === side;
    const mq = !query  || h.name.toLowerCase().includes(query);
    return ms && md && mq;
  });
}

// ============================================================
// Animation CountUp
// ============================================================

function animateCount(el, target) {
  if (!el) return;
  const start = parseInt(el.textContent, 10) || 0;
  if (start === target) return;

  const duration = 380;
  const startTime = performance.now();

  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
    el.textContent = Math.round(start + (target - start) * eased);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
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
// Création d'une carte casque
// ============================================================

function createHelmetCard(helmet, index) {
  const article = document.createElement('article');
  article.className = 'helmet-card';
  article.dataset.side = helmet.side;
  article.setAttribute('aria-label', helmet.name);

  // Stagger animation — max 0.6s pour les 24 casques
  const delay = Math.min(index * 0.05, 0.6);
  article.style.setProperty('--delay', `${delay}s`);

  const sideClass  = getSideClass(helmet.side);
  const sideLabel  = getSideLabel(helmet.side);
  const seriesKey  = getSeriesKey(helmet.series);

  // Fallback image avec couleur selon le côté
  const fallbackBg = helmet.side === 'light' ? '111827/4fc3f7' : '111827/e53935';

  article.innerHTML = `
    <div class="helmet-card__image-wrap">
      <img
        class="helmet-card__image"
        src="${helmet.image_url}"
        alt="${helmet.name} — Set Lego #${helmet.set_number}"
        loading="lazy"
        width="300"
        height="300"
        onerror="this.src='https://placehold.co/300x300/${fallbackBg}?text=%23${helmet.set_number}'"
      />
      <span class="badge-series-pill" data-series="${seriesKey}" aria-label="Série : ${helmet.series}">${helmet.series}</span>
      <span class="badge-side-pill ${sideClass}" aria-label="${sideLabel}">${sideLabel}</span>
    </div>
    <div class="helmet-card__body">
      <h2 class="helmet-card__name">${helmet.name}</h2>
      <div class="helmet-card__meta">
        <span class="helmet-card__series">${helmet.series}</span>
        <span class="helmet-card__year">· ${helmet.year}</span>
      </div>
      <div class="helmet-card__set">#${helmet.set_number}</div>
      <div class="helmet-card__cta">Voir détails ▶</div>
    </div>
  `;

  return article;
}

// ============================================================
// Rendu de la grille
// ============================================================

function renderGrid() {
  const filtered = getFilteredHelmets();

  // Vider la grille (performant avec DocumentFragment)
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  const fragment = document.createDocumentFragment();
  filtered.forEach((helmet, idx) => {
    fragment.appendChild(createHelmetCard(helmet, idx));
  });
  grid.appendChild(fragment);

  // Compteur animé
  animateCount(countEl, filtered.length);

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
// Filtres
// ============================================================

function initFilters() {
  // Délégation d'événements sur la section filtres
  document.querySelector('.filters-section').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filterType  = btn.dataset.filter;
    const filterValue = btn.dataset.value;

    state.filters[filterType] = filterValue;

    // Mettre à jour l'état visuel du groupe
    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(b => {
      b.classList.toggle('active', b === btn);
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

  // Bouton reset (état vide)
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }
}

function resetFilters() {
  state.filters = { series: 'all', side: 'all', search: '' };

  if (searchInput) searchInput.value = '';

  // Réactiver les boutons "Tous" pour chaque groupe
  ['series', 'side'].forEach(filterType => {
    const allBtn = document.querySelector(`[data-filter="${filterType}"][data-value="all"]`);
    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(b => {
      b.classList.toggle('active', b === allBtn);
    });
  });

  renderGrid();
}

// ============================================================
// Starfield — génération des box-shadows en JS
// ============================================================

function generateStarShadows(count, maxW, maxH) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxW);
    const y = Math.floor(Math.random() * maxH * 2);
    // Variations de luminosité légères
    const lightness = Math.floor(70 + Math.random() * 30);
    shadows.push(`${x}px ${y}px hsl(220, 20%, ${lightness}%)`);
  }
  return shadows.join(', ');
}

function initStarfield() {
  const W = window.innerWidth  || 1440;
  const H = window.innerHeight || 900;

  const layers = [
    { id: 'stars-1', count: 200, size: '1px', opacity: 0.7 },
    { id: 'stars-2', count: 100, size: '2px', opacity: 0.6 },
    { id: 'stars-3', count:  50, size: '3px', opacity: 0.5 },
  ];

  layers.forEach(({ id, count, size, opacity }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.width         = size;
    el.style.height        = size;
    el.style.borderRadius  = '50%';
    el.style.background    = 'white';
    el.style.opacity       = opacity;
    el.style.boxShadow     = generateStarShadows(count, W, H);
    // Créer un clone pour le doublement (effet wrap fluide)
    const clone = el.cloneNode(true);
    clone.id = id + '-clone';
    clone.style.position = 'absolute';
    clone.style.top = '100%';
    clone.style.left = '0';
    el.parentElement.appendChild(clone);
  });
}

// ============================================================
// Force Particles — Canvas overlay
// ============================================================

function initForceParticles() {
  const canvas = document.getElementById('force-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId    = null;
  let isActive  = false;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeParticle(side) {
    const useLight = side === 'light' || side === 'all';
    const useDark  = side === 'dark'  || side === 'all';

    let color;
    if (useLight && useDark) {
      color = Math.random() < 0.5 ? [79, 195, 247] : [229, 57, 53];
    } else if (useLight) {
      color = [79, 195, 247];
    } else {
      color = [229, 57, 53];
    }

    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    (Math.random() - 0.5) * 0.4,
      size:  Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color,
    };
  }

  function spawnParticles(side = 'all') {
    particles = Array.from({ length: 30 }, () => makeParticle(side));
  }

  function tick() {
    if (!isActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaDir * 0.005;
      if (p.alpha > 0.6 || p.alpha < 0.05) p.alphaDir *= -1;

      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const [r, g, b] = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(tick);
  }

  // Activation au hover sur les filtres Côté de la Force
  document.querySelectorAll('[data-filter="side"]').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const side = btn.dataset.value === 'all' ? 'all' : btn.dataset.value;
      isActive = true;
      canvas.classList.add('active');
      spawnParticles(side);
      cancelAnimationFrame(animId);
      tick();
    });

    btn.addEventListener('mouseleave', () => {
      isActive = false;
      canvas.classList.remove('active');
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
}

// ============================================================
// Chargement des données
// ============================================================

async function loadHelmets() {
  showSpinner();

  try {
    const res = await fetch('./data/helmets.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    state.helmets = await res.json();

    // Tri : plus récent en premier, puis alphabétique
    state.helmets.sort((a, b) =>
      b.year - a.year || a.name.localeCompare(b.name, 'fr')
    );

    // Mettre à jour le compteur hero
    if (heroCountEl) heroCountEl.textContent = state.helmets.length;

    hideSpinner();
    renderGrid();

  } catch (err) {
    console.error('[Lego Helmets] Impossible de charger les données :', err);
    hideSpinner();
    grid.classList.remove('hidden');
    grid.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        color: #ef5350;
        font-family: var(--font-display, monospace);
        padding: 4rem;
        letter-spacing: 0.05em;
      ">
        ⚠️ Erreur de chargement des casques.<br>
        <small style="color: #8892a4; font-family: var(--font-mono, monospace); font-size: 0.75rem;">
          ${err.message}
        </small>
      </p>
    `;
    if (countEl) countEl.textContent = 0;
  }
}

// ============================================================
// Point d'entrée
// ============================================================

function init() {
  initStarfield();
  initFilters();
  initForceParticles();
  loadHelmets();
}

document.addEventListener('DOMContentLoaded', init);
