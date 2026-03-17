/**
 * app.js — Lego Star Wars Helmet Collection
 * Design System v2.0 — UX Enhanced
 * Vanilla JS · ES6+ · Aucune dépendance
 */

'use strict';

// ============================================================
// Constantes
// ============================================================
const YEAR_MIN = 2019;
const YEAR_MAX = 2024;

// ============================================================
// État de l'application
// ============================================================
const state = {
  helmets: [],
  filtered: [],
  favorites: new Set(JSON.parse(localStorage.getItem('lego-sw-favorites') || '[]')),
  filters: {
    series: 'all',
    side:   'all',
    search: ''
  },
  sort: 'year-desc',
  modal: {
    open: false,
    helmetId: null,
    filteredIndex: null
  }
};

// ============================================================
// Références DOM
// ============================================================
const grid           = document.getElementById('helmets-grid');
const countEl        = document.getElementById('helmet-count');
const emptyState     = document.getElementById('empty-state');
const loadingSpinner = document.getElementById('loading-spinner');
const searchInput    = document.getElementById('search-input');
const searchClear    = document.getElementById('search-clear');
const sortSelect     = document.getElementById('sort-select');
const resetBtn       = document.getElementById('reset-filters');
const activeFiltersEl= document.getElementById('active-filters');
const modalEl        = document.getElementById('helmet-modal');
const modalContainer = document.getElementById('modal-container');
const modalClose     = document.getElementById('modal-close');
const modalPrev      = document.getElementById('modal-prev');
const modalNext      = document.getElementById('modal-next');

// Hero stats
const statTotal  = document.getElementById('stat-total');
const statSeries = document.getElementById('stat-series');
const statLight  = document.getElementById('stat-light');
const statDark   = document.getElementById('stat-dark');

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
 * Calcule le % de progression année (2019 → 2024)
 */
function yearProgress(year) {
  const pct = ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;
  return Math.min(100, Math.max(8, pct));
}

/**
 * Sauvegarde les favoris dans localStorage
 */
function saveFavorites() {
  localStorage.setItem('lego-sw-favorites', JSON.stringify([...state.favorites]));
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
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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
// Filtrage & tri
// ============================================================

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

function sortHelmets(helmets) {
  const sorted = [...helmets];
  switch (state.sort) {
    case 'year-desc':
      sorted.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name, 'fr'));
      break;
    case 'year-asc':
      sorted.sort((a, b) => a.year - b.year || a.name.localeCompare(b.name, 'fr'));
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
      break;
    case 'series':
      sorted.sort((a, b) => a.series.localeCompare(b.series, 'fr') || a.name.localeCompare(b.name, 'fr'));
      break;
  }
  return sorted;
}

// ============================================================
// Compteurs de filtres dynamiques
// ============================================================

function updateFilterCounts() {
  const seriesMap = {
    'Trilogie Originale': 'count-series-original',
    'Prélogie':           'count-series-prequel',
    'Trilogie Sequel':    'count-series-sequel',
    'The Mandalorian':    'count-series-mando',
    'The Clone Wars':     'count-series-clone-wars',
    'Divers':             'count-series-divers',
  };

  // Compte tous les casques pour chaque série (sans filtre série, mais avec filtre side+search)
  const { side, search } = state.filters;
  const query = search.trim().toLowerCase();

  // Pour "Tous" — nombre total sans filtre série ni côté
  const allFilteredNoSeries = state.helmets.filter(h => {
    const md = side === 'all' || h.side === side;
    const mq = !query || h.name.toLowerCase().includes(query);
    return md && mq;
  });
  const allCountEl = document.getElementById('count-series-all');
  if (allCountEl) allCountEl.textContent = allFilteredNoSeries.length;

  // Comptes par série
  Object.entries(seriesMap).forEach(([seriesName, elId]) => {
    const el = document.getElementById(elId);
    if (!el) return;
    const count = state.helmets.filter(h => {
      const ms = h.series === seriesName;
      const md = side === 'all' || h.side === side;
      const mq = !query || h.name.toLowerCase().includes(query);
      return ms && md && mq;
    }).length;
    el.textContent = count;
  });
}

// ============================================================
// Active filter tags
// ============================================================

function renderActiveFilterTags() {
  if (!activeFiltersEl) return;

  const tags = [];
  const { series, side, search } = state.filters;

  if (series !== 'all') {
    tags.push({ type: 'series', label: series, dark: false });
  }
  if (side !== 'all') {
    tags.push({ type: 'side', label: getSideLabel(side), dark: side === 'dark' });
  }
  if (search.trim()) {
    tags.push({ type: 'search', label: `"${search.trim()}"`, dark: false });
  }

  if (tags.length === 0) {
    activeFiltersEl.innerHTML = '';
    activeFiltersEl.classList.remove('has-tags');
    return;
  }

  activeFiltersEl.classList.add('has-tags');

  const fragment = document.createDocumentFragment();

  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = `active-filter-tag${tag.dark ? ' active-filter-tag--dark' : ''}`;

    const label = document.createTextNode(tag.label);
    span.appendChild(label);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'active-filter-tag__remove';
    removeBtn.setAttribute('aria-label', `Supprimer le filtre ${tag.label}`);
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => removeTag(tag.type));
    span.appendChild(removeBtn);

    fragment.appendChild(span);
  });

  // Bouton "Tout effacer"
  const clearAll = document.createElement('button');
  clearAll.className = 'active-filters-clear';
  clearAll.textContent = 'Tout effacer';
  clearAll.addEventListener('click', resetFilters);
  fragment.appendChild(clearAll);

  activeFiltersEl.innerHTML = '';
  activeFiltersEl.appendChild(fragment);
}

function removeTag(type) {
  if (type === 'series') {
    state.filters.series = 'all';
    document.querySelectorAll('[data-filter="series"]').forEach(b => {
      b.classList.toggle('active', b.dataset.value === 'all');
    });
  } else if (type === 'side') {
    state.filters.side = 'all';
    document.querySelectorAll('[data-filter="side"]').forEach(b => {
      b.classList.toggle('active', b.dataset.value === 'all');
    });
  } else if (type === 'search') {
    state.filters.search = '';
    if (searchInput) {
      searchInput.value = '';
      searchClear && searchClear.classList.add('hidden');
    }
  }
  renderGrid();
}

// ============================================================
// Création d'une carte casque
// ============================================================

function createHelmetCard(helmet, index) {
  const article = document.createElement('article');
  article.className = 'helmet-card';
  article.dataset.side = helmet.side;
  article.dataset.id   = helmet.id;
  article.setAttribute('aria-label', helmet.name);

  // Stagger animation — max 0.6s
  const delay = Math.min(index * 0.05, 0.6);
  article.style.setProperty('--delay', `${delay}s`);

  const sideClass  = getSideClass(helmet.side);
  const sideLabel  = getSideLabel(helmet.side);
  const seriesKey  = getSeriesKey(helmet.series);
  const yearPct    = yearProgress(helmet.year);
  const isFav      = state.favorites.has(helmet.id);

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

      <!-- v2: Quick actions au hover -->
      <div class="card-actions" aria-label="Actions rapides">
        <button class="card-action-btn card-action-btn--detail"
          aria-label="Voir les détails de ${helmet.name}"
          data-action="detail" data-id="${helmet.id}">🔍</button>
        <button class="card-action-btn card-action-btn--fav${isFav ? ' active' : ''}"
          aria-label="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
          data-action="fav" data-id="${helmet.id}">${isFav ? '♥' : '♡'}</button>
      </div>
    </div>
    <div class="helmet-card__body">
      <h2 class="helmet-card__name">${helmet.name}</h2>
      <div class="helmet-card__meta">
        <span class="helmet-card__series">${helmet.series}</span>
        <span class="helmet-card__year">· ${helmet.year}</span>
      </div>
      <div class="helmet-card__set">#${helmet.set_number}</div>
      <!-- v2: Barre de progression année -->
      <div class="helmet-card__year-bar" aria-label="Année de sortie ${helmet.year}" role="meter" aria-valuenow="${helmet.year}" aria-valuemin="${YEAR_MIN}" aria-valuemax="${YEAR_MAX}">
        <div class="helmet-card__year-fill" style="width:${yearPct}%"></div>
      </div>
    </div>
  `;

  // Clic sur la carte (hors quick actions) → ouvre la modal
  article.addEventListener('click', e => {
    const btn = e.target.closest('.card-action-btn');
    if (btn) return; // géré par délégation
    openModal(helmet.id);
  });
  article.style.cursor = 'pointer';

  return article;
}

// ============================================================
// Rendu de la grille
// ============================================================

function renderGrid() {
  const filtered = getFilteredHelmets();
  const sorted   = sortHelmets(filtered);
  state.filtered = sorted;

  // Vider la grille
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  const fragment = document.createDocumentFragment();
  sorted.forEach((helmet, idx) => {
    fragment.appendChild(createHelmetCard(helmet, idx));
  });
  grid.appendChild(fragment);

  // Compteur animé
  animateCount(countEl, sorted.length);

  // Active filter tags + compteurs
  renderActiveFilterTags();
  updateFilterCounts();

  // État vide
  if (sorted.length === 0) {
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
      // Afficher / cacher le bouton clear
      if (searchClear) {
        searchClear.classList.toggle('hidden', !searchInput.value.length);
      }
      renderGrid();
    });
  }

  // Clear search btn
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      state.filters.search = '';
      searchInput.value = '';
      searchClear.classList.add('hidden');
      searchInput.focus();
      renderGrid();
    });
  }

  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      renderGrid();
    });
  }

  // Bouton reset (état vide)
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  // Délégation quick actions sur la grille
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.card-action-btn');
    if (!btn) return;
    e.stopPropagation();

    const action = btn.dataset.action;
    const id     = parseInt(btn.dataset.id, 10);

    if (action === 'detail') {
      openModal(id);
    } else if (action === 'fav') {
      toggleFavorite(id, btn);
    }
  });
}

function resetFilters() {
  state.filters = { series: 'all', side: 'all', search: '' };

  if (searchInput) searchInput.value = '';
  if (searchClear) searchClear.classList.add('hidden');

  ['series', 'side'].forEach(filterType => {
    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(b => {
      b.classList.toggle('active', b.dataset.value === 'all');
    });
  });

  renderGrid();
}

// ============================================================
// Favoris
// ============================================================

function toggleFavorite(id, btn) {
  const helmet = state.helmets.find(h => h.id === id);
  if (!helmet) return;

  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    btn.textContent = '♡';
    btn.classList.remove('active');
    btn.setAttribute('aria-label', `Ajouter aux favoris`);
  } else {
    state.favorites.add(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    btn.setAttribute('aria-label', `Retirer des favoris`);
    // Animation small bounce
    btn.style.transform = 'scale(1.35)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }

  saveFavorites();

  // Sync bouton dans la modal si ouverte sur ce casque
  if (state.modal.open && state.modal.helmetId === id) {
    const favIcon = document.getElementById('modal-fav-icon');
    const favBtn  = document.getElementById('modal-fav-btn');
    if (favIcon && favBtn) {
      favIcon.textContent = state.favorites.has(id) ? '♥' : '♡';
      favBtn.classList.toggle('active', state.favorites.has(id));
    }
  }
}

// ============================================================
// Modal Détail
// ============================================================

function openModal(helmetId) {
  const helmet = state.helmets.find(h => h.id === helmetId);
  if (!helmet) return;

  // Index dans les résultats filtrés pour la navigation
  state.modal.filteredIndex = state.filtered.findIndex(h => h.id === helmetId);
  state.modal.helmetId = helmetId;
  state.modal.open = true;

  populateModal(helmet);

  modalEl.classList.remove('hidden');
  modalEl.setAttribute('data-side', helmet.side);
  document.body.style.overflow = 'hidden';

  // Focus trap
  setTimeout(() => modalClose && modalClose.focus(), 50);
}

function closeModal() {
  state.modal.open = false;
  state.modal.helmetId = null;
  state.modal.filteredIndex = null;

  modalEl.classList.add('hidden');
  document.body.style.overflow = '';
}

function navigateModal(dir) {
  if (state.modal.filteredIndex === null) return;
  const newIndex = state.modal.filteredIndex + dir;
  if (newIndex < 0 || newIndex >= state.filtered.length) return;

  const helmet = state.filtered[newIndex];
  state.modal.filteredIndex = newIndex;
  state.modal.helmetId = helmet.id;

  populateModal(helmet);
  modalEl.setAttribute('data-side', helmet.side);

  // Transition rapide
  modalContainer.style.opacity = '0';
  modalContainer.style.transform = 'scale(0.97)';
  setTimeout(() => {
    modalContainer.style.opacity = '';
    modalContainer.style.transform = '';
  }, 100);
}

function populateModal(helmet) {
  const seriesKey = getSeriesKey(helmet.series);
  const isFav     = state.favorites.has(helmet.id);
  const fallbackBg = helmet.side === 'light' ? '111827/4fc3f7' : '111827/e53935';

  // Image
  const modalImg = document.getElementById('modal-image');
  if (modalImg) {
    modalImg.src = helmet.image_url;
    modalImg.alt = `${helmet.name} — Set Lego #${helmet.set_number}`;
    modalImg.onerror = () => { modalImg.src = `https://placehold.co/300x300/${fallbackBg}?text=%23${helmet.set_number}`; };
  }

  // Glow
  const glow = document.getElementById('modal-image-glow');
  if (glow) {
    glow.style.background = helmet.side === 'light'
      ? 'var(--color-light-primary)'
      : 'var(--color-dark-primary)';
  }

  // Side badge
  const sideBadge = document.getElementById('modal-side-badge');
  if (sideBadge) {
    sideBadge.textContent = getSideLabel(helmet.side);
    sideBadge.className = `modal-side-badge modal-side-badge--${helmet.side}`;
  }

  // Series badge
  const seriesBadge = document.getElementById('modal-series-badge');
  if (seriesBadge) {
    seriesBadge.textContent = helmet.series;
    const colors = {
      original: '#ffd54f', prequel: '#66bb6a', sequel: '#ef5350',
      mando: '#90a4ae', 'clone-wars': '#26c6da', divers: '#9e9e9e'
    };
    const c = colors[seriesKey] || '#9e9e9e';
    seriesBadge.style.background = `${c}18`;
    seriesBadge.style.border     = `1px solid ${c}60`;
    seriesBadge.style.color      = c;
  }

  // Nom + specs
  const nameEl = document.getElementById('modal-helmet-name');
  if (nameEl) nameEl.textContent = helmet.name;

  const setEl = document.getElementById('modal-set-number');
  if (setEl) setEl.textContent = `#${helmet.set_number}`;

  const yearEl = document.getElementById('modal-year');
  if (yearEl) yearEl.textContent = helmet.year;

  const seriesEl = document.getElementById('modal-series');
  if (seriesEl) seriesEl.textContent = helmet.series;

  const sideEl = document.getElementById('modal-side');
  if (sideEl) sideEl.textContent = getSideLabel(helmet.side);

  // Force bar
  const forceFill = document.getElementById('modal-force-fill');
  if (forceFill) {
    const pct = helmet.side === 'light' ? 80 : 80;
    forceFill.style.width = `${pct}%`;
    forceFill.style.background = helmet.side === 'light'
      ? 'linear-gradient(90deg, rgba(79,195,247,0.3), #4fc3f7)'
      : 'linear-gradient(90deg, rgba(229,57,53,0.3), #e53935)';
  }
  const forceLabel = document.getElementById('modal-force-label');
  if (forceLabel) {
    forceLabel.textContent = helmet.side === 'light' ? 'Côté Lumineux de la Force' : 'Côté Obscur de la Force';
  }

  // Fav btn
  const favIcon = document.getElementById('modal-fav-icon');
  const favBtn  = document.getElementById('modal-fav-btn');
  if (favIcon) favIcon.textContent = isFav ? '♥' : '♡';
  if (favBtn) {
    favBtn.classList.toggle('active', isFav);
    favBtn.onclick = () => {
      toggleFavorite(helmet.id, null);
      // Re-sync icône
      favIcon.textContent = state.favorites.has(helmet.id) ? '♥' : '♡';
      favBtn.classList.toggle('active', state.favorites.has(helmet.id));
      // Sync la card dans la grille
      const cardFavBtn = grid.querySelector(`.card-action-btn--fav[data-id="${helmet.id}"]`);
      if (cardFavBtn) {
        cardFavBtn.textContent = state.favorites.has(helmet.id) ? '♥' : '♡';
        cardFavBtn.classList.toggle('active', state.favorites.has(helmet.id));
      }
    };
  }

  // Titre accessibility
  if (nameEl) nameEl.id = 'modal-helmet-name';

  // Nav arrows visibility
  if (modalPrev) modalPrev.style.opacity = state.modal.filteredIndex > 0 ? '' : '0.3';
  if (modalNext) modalNext.style.opacity = state.modal.filteredIndex < state.filtered.length - 1 ? '' : '0.3';
}

function initModal() {
  if (!modalEl) return;

  // Close btn
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Click hors du container
  modalEl.addEventListener('click', e => {
    if (!modalContainer.contains(e.target)) closeModal();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!state.modal.open) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'ArrowLeft')  { navigateModal(-1); e.preventDefault(); return; }
    if (e.key === 'ArrowRight') { navigateModal(+1); e.preventDefault(); return; }
  });

  // Nav buttons
  if (modalPrev) modalPrev.addEventListener('click', () => navigateModal(-1));
  if (modalNext) modalNext.addEventListener('click', () => navigateModal(+1));

  // Transition style on container
  if (modalContainer) {
    modalContainer.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
  }
}

// ============================================================
// Starfield — génération des box-shadows en JS
// ============================================================

function generateStarShadows(count, maxW, maxH) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxW);
    const y = Math.floor(Math.random() * maxH * 2);
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

    // Tri initial
    state.helmets.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name, 'fr'));

    // Hero stats
    const totalCount  = state.helmets.length;
    const seriesCount = [...new Set(state.helmets.map(h => h.series))].length;
    const lightCount  = state.helmets.filter(h => h.side === 'light').length;
    const darkCount   = state.helmets.filter(h => h.side === 'dark').length;

    animateCount(statTotal,  totalCount);
    animateCount(statSeries, seriesCount);
    animateCount(statLight,  lightCount);
    animateCount(statDark,   darkCount);

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
  initModal();
  initForceParticles();
  loadHelmets();
}

document.addEventListener('DOMContentLoaded', init);
