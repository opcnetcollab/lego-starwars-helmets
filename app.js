/* ═══════════════════════════════════════════════════════════
   LEGO STAR WARS HELMETS v3 — White Gallery Luxe
   app.js — Vanilla JS, no framework
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
const state = {
  helmets: [],         // All helmets from JSON
  filtered: [],        // Currently displayed helmets
  filters: {
    series: 'all',
    side: null,        // 'light' | 'dark' | null
    search: '',
    sort: 'default',
  },
  favorites: new Set(),
  currentView: 'grid',
  modal: {
    open: false,
    currentId: null,
    filteredList: [],  // Index within filtered for prev/next
    lastFocused: null, // Pour restaurer le focus à la fermeture (WCAG 2.4.3)
  }
};

// ─────────────────────────────────────────────
// DOM REFS
// ─────────────────────────────────────────────
const dom = {
  grid:           document.getElementById('helmets-grid'),
  emptyState:     document.getElementById('empty-state'),
  emptyReset:     document.getElementById('empty-reset'),
  countText:      document.getElementById('count-text'),
  activeFilters:  document.getElementById('active-filters'),
  activeTagsCont: document.getElementById('active-filter-tags'),
  clearAllBtn:    document.getElementById('clear-all-btn'),
  searchInput:    document.getElementById('search-input'),
  searchClear:    document.getElementById('search-clear'),
  sortSelect:     document.getElementById('sort-select'),
  viewGrid:       document.getElementById('view-grid'),
  viewList:       document.getElementById('view-list'),
  navFavCount:    document.getElementById('nav-fav-count'),
  filterPills:    document.querySelectorAll('.filter-pill'),
  forceToggles:   document.querySelectorAll('.force-toggle'),
  // Hero stats
  statTotal:      document.getElementById('stat-total'),
  statSeries:     document.getElementById('stat-series'),
  statLight:      document.getElementById('stat-light'),
  statDark:       document.getElementById('stat-dark'),
  // Modal
  backdrop:       document.getElementById('modal-backdrop'),
  modal:          document.getElementById('helmet-modal'),
  modalClose:     document.getElementById('modal-close'),
  modalImage:     document.getElementById('modal-image'),
  modalForceBadge:document.getElementById('modal-force-badge'),
  modalNavPrev:   document.getElementById('modal-prev'),
  modalNavNext:   document.getElementById('modal-next'),
  modalNavPos:    document.getElementById('modal-nav-pos'),
  modalSetNum:    document.getElementById('modal-set-num'),
  modalTitle:     document.getElementById('modal-title'),
  specSet:        document.getElementById('spec-set'),
  specYear:       document.getElementById('spec-year'),
  specSeries:     document.getElementById('spec-series'),
  specSide:       document.getElementById('spec-side'),
  modalDesc:      document.getElementById('modal-description'),
  modalLegoLink:  document.getElementById('modal-lego-link'),
  modalBrickLink: document.getElementById('modal-bricklink-link'),
  modalFavBtn:    document.getElementById('modal-fav-btn'),
};

// ─────────────────────────────────────────────
// LOAD DATA
// ─────────────────────────────────────────────
async function init() {
  try {
    const resp = await fetch('data/helmets.json');
    if (!resp.ok) throw new Error('Failed to load helmets.json');
    state.helmets = await resp.json();
  } catch (e) {
    console.error('Could not load helmet data:', e);
    dom.grid.innerHTML = '<p style="text-align:center;padding:48px;color:#9CA3AF;">Impossible de charger les données.</p>';
    return;
  }

  loadFavorites();
  computeHeroStats();
  applyFilters();
  bindEvents();
}

// ─────────────────────────────────────────────
// HERO STATS
// ─────────────────────────────────────────────
function computeHeroStats() {
  const total  = state.helmets.length;
  const series = new Set(state.helmets.map(h => h.series)).size;
  const light  = state.helmets.filter(h => h.side === 'light').length;
  const dark   = state.helmets.filter(h => h.side === 'dark').length;

  dom.statTotal.textContent  = String(total).padStart(2, '0');
  dom.statSeries.textContent = String(series).padStart(2, '0');
  dom.statLight.textContent  = String(light).padStart(2, '0');
  dom.statDark.textContent   = String(dark).padStart(2, '0');
}

// ─────────────────────────────────────────────
// FILTER & SORT
// ─────────────────────────────────────────────
function applyFilters() {
  let result = [...state.helmets];

  // Series filter
  if (state.filters.series !== 'all') {
    result = result.filter(h => h.series === state.filters.series);
  }

  // Force side filter
  if (state.filters.side) {
    result = result.filter(h => h.side === state.filters.side);
  }

  // Search filter
  const q = state.filters.search.toLowerCase().trim();
  if (q) {
    result = result.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.set_number.toLowerCase().includes(q) ||
      h.series.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (state.filters.sort) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      break;
    case 'year-asc':
      result.sort((a, b) => a.year - b.year);
      break;
    case 'year-desc':
      result.sort((a, b) => b.year - a.year);
      break;
    case 'series':
      result.sort((a, b) => a.series.localeCompare(b.series, 'fr') || a.name.localeCompare(b.name, 'fr'));
      break;
    default:
      // Keep original order
      break;
  }

  state.filtered = result;
  state.modal.filteredList = result.map(h => h.id);

  renderGrid();
  renderCountBar();
  renderActiveFilterTags();
  updateFilterPillCounts();
}

// ─────────────────────────────────────────────
// RENDER GRID
// ─────────────────────────────────────────────
function renderGrid() {
  if (state.filtered.length === 0) {
    dom.grid.innerHTML = '';
    dom.emptyState.hidden = false;
    return;
  }

  dom.emptyState.hidden = true;
  dom.grid.className = `helmets-grid${state.currentView === 'list' ? ' view-list' : ''}`;

  const fragment = document.createDocumentFragment();

  state.filtered.forEach((helmet, index) => {
    const card = createCard(helmet, index);
    fragment.appendChild(card);
  });

  dom.grid.innerHTML = '';
  dom.grid.appendChild(fragment);
}

function createCard(helmet, index) {
  const isFav = state.favorites.has(helmet.id);

  const card = document.createElement('div');
  card.className = 'helmet-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${helmet.name}, ${helmet.series}, ${helmet.year}`);
  card.dataset.id = helmet.id;
  card.style.animationDelay = `${Math.min(index * 30, 300)}ms`;

  card.innerHTML = `
    <div class="card-image-wrap">
      <img
        src="${escapeHtml(helmet.image_url)}"
        alt="${escapeHtml(helmet.name)}"
        loading="lazy"
        width="200"
        height="200"
        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23F5F4F1%22/%3E%3Ctext x=%2250%22 y=%2254%22 text-anchor=%22middle%22 fill=%22%23D1D5DB%22 font-size=%2212%22%3E${escapeHtml(helmet.set_number)}%3C/text%3E%3C/svg%3E'"
      />
    </div>
    <div class="card-info">
      <div class="card-name">${escapeHtml(helmet.name)}</div>
      <div class="card-meta">${escapeHtml(helmet.series)} · ${helmet.year}</div>
      <div class="card-set">#${escapeHtml(helmet.set_number)}</div>
    </div>
    <button
      class="card-fav-btn${isFav ? ' active' : ''}"
      aria-label="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
      aria-pressed="${isFav}"
      data-id="${helmet.id}"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
    </button>
  `;

  // Card click → open modal
  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-fav-btn')) return; // handled separately
    openModal(helmet.id);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(helmet.id);
    }
  });

  // Fav button
  card.querySelector('.card-fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(helmet.id);
    renderGrid(); // re-render to update icon
  });

  return card;
}

// ─────────────────────────────────────────────
// COUNT BAR
// ─────────────────────────────────────────────
function renderCountBar() {
  const total = state.helmets.length;
  const shown = state.filtered.length;
  const hasFilters = state.filters.series !== 'all' ||
                     state.filters.side !== null ||
                     state.filters.search !== '';

  dom.countText.textContent = hasFilters
    ? `${shown} of ${total} casques`
    : `${total} casques`;
}

// ─────────────────────────────────────────────
// ACTIVE FILTER TAGS
// ─────────────────────────────────────────────
function renderActiveFilterTags() {
  const tags = [];

  if (state.filters.series !== 'all') {
    tags.push({ key: 'series', label: state.filters.series });
  }
  if (state.filters.side) {
    tags.push({ key: 'side', label: state.filters.side === 'light' ? 'Light Side' : 'Dark Side' });
  }
  if (state.filters.search) {
    tags.push({ key: 'search', label: `"${state.filters.search}"` });
  }

  dom.activeFilters.hidden = tags.length === 0;

  dom.activeTagsCont.innerHTML = '';

  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'active-filter-tag';
    btn.setAttribute('aria-label', `Supprimer le filtre ${tag.label}`);
    btn.innerHTML = `${escapeHtml(tag.label)} <span class="tag-remove" aria-hidden="true">×</span>`;
    btn.addEventListener('click', () => removeFilter(tag.key));
    dom.activeTagsCont.appendChild(btn);
  });
}

function removeFilter(key) {
  if (key === 'series') {
    state.filters.series = 'all';
    syncSeriesPills();
  } else if (key === 'side') {
    state.filters.side = null;
    syncForceToggles();
  } else if (key === 'search') {
    state.filters.search = '';
    dom.searchInput.value = '';
    dom.searchClear.hidden = true;
  }
  applyFilters();
}

function clearAllFilters() {
  state.filters.series = 'all';
  state.filters.side = null;
  state.filters.search = '';
  state.filters.sort = 'default';
  dom.searchInput.value = '';
  dom.searchClear.hidden = true;
  dom.sortSelect.value = 'default';
  syncSeriesPills();
  syncForceToggles();
  applyFilters();
}

// ─────────────────────────────────────────────
// FILTER PILL COUNTS
// ─────────────────────────────────────────────
function updateFilterPillCounts() {
  // Pre-filter by side + search only (no series) to compute per-series counts
  let base = [...state.helmets];
  if (state.filters.side) base = base.filter(h => h.side === state.filters.side);
  const q = state.filters.search.toLowerCase().trim();
  if (q) base = base.filter(h =>
    h.name.toLowerCase().includes(q) ||
    h.set_number.toLowerCase().includes(q) ||
    h.series.toLowerCase().includes(q)
  );

  dom.filterPills.forEach(pill => {
    const val = pill.dataset.value;
    const count = val === 'all' ? base.length : base.filter(h => h.series === val).length;
    // Optionally show count as small superscript
    const existing = pill.querySelector('.pill-count');
    if (existing) existing.remove();
    if (val !== 'all') {
      const sup = document.createElement('sup');
      sup.className = 'pill-count';
      sup.style.cssText = 'font-size:0.5em;opacity:0.6;margin-left:3px;font-family:var(--font-mono)';
      sup.textContent = count;
      pill.appendChild(sup);
    }
  });
}

// ─────────────────────────────────────────────
// SYNC FILTER UI
// ─────────────────────────────────────────────
function syncSeriesPills() {
  dom.filterPills.forEach(pill => {
    const isActive = pill.dataset.value === state.filters.series;
    pill.classList.toggle('active', isActive);
    pill.setAttribute('aria-pressed', String(isActive));
  });
}

function syncForceToggles() {
  dom.forceToggles.forEach(btn => {
    const isActive = btn.dataset.side === state.filters.side;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

// ─────────────────────────────────────────────
// FAVORITES
// ─────────────────────────────────────────────
function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem('sw-helmet-favs') || '[]');
    state.favorites = new Set(stored);
  } catch {
    state.favorites = new Set();
  }
  updateFavCount();
}

function saveFavorites() {
  localStorage.setItem('sw-helmet-favs', JSON.stringify([...state.favorites]));
  updateFavCount();
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  saveFavorites();

  // Update modal button if open on this helmet
  if (state.modal.open && state.modal.currentId === id) {
    syncModalFavBtn(id);
  }
}

function updateFavCount() {
  const count = state.favorites.size;
  dom.navFavCount.textContent = count;
  dom.navFavCount.hidden = count === 0;
}

// ─────────────────────────────────────────────
// VIEW TOGGLE
// ─────────────────────────────────────────────
function setView(mode) {
  state.currentView = mode;
  dom.viewGrid.classList.toggle('active', mode === 'grid');
  dom.viewList.classList.toggle('active', mode === 'list');
  dom.viewGrid.setAttribute('aria-pressed', String(mode === 'grid'));
  dom.viewList.setAttribute('aria-pressed', String(mode === 'list'));
  dom.grid.className = `helmets-grid${mode === 'list' ? ' view-list' : ''}`;
}

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────
function openModal(id) {
  const helmet = state.helmets.find(h => h.id === id);
  if (!helmet) return;

  state.modal.lastFocused = document.activeElement; // mémoriser pour restaurer au close
  state.modal.open = true;
  state.modal.currentId = id;

  // Update filteredList in case it changed
  state.modal.filteredList = state.filtered.map(h => h.id);

  populateModal(helmet);

  dom.backdrop.classList.add('open');
  dom.backdrop.setAttribute('aria-hidden', 'false');

  // Focus the close button
  requestAnimationFrame(() => dom.modalClose.focus());

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  state.modal.open = false;
  dom.backdrop.classList.remove('open');
  dom.backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Restaurer le focus sur l'élément déclencheur (WCAG 2.1 SC 2.4.3)
  state.modal.lastFocused?.focus();
  state.modal.lastFocused = null;
}

function populateModal(helmet) {
  dom.modalImage.src = helmet.image_url;
  dom.modalImage.alt = helmet.name;

  dom.modalSetNum.textContent = `SET #${helmet.set_number}`;
  dom.modalTitle.textContent  = helmet.name;
  dom.specSet.textContent     = helmet.set_number;
  dom.specYear.textContent    = helmet.year;
  dom.specSeries.textContent  = helmet.series;
  dom.specSide.textContent    = helmet.side === 'light' ? 'Light Side' : 'Dark Side';

  // Force badge
  dom.modalForceBadge.dataset.side = helmet.side;
  dom.modalForceBadge.textContent  = helmet.side === 'light'
    ? '✦ Côté Lumineux'
    : '✦ Côté Obscur';

  // Description (generated)
  dom.modalDesc.textContent = generateDescription(helmet);

  // CTA links
  dom.modalLegoLink.href      = `https://www.lego.com/fr-fr/search?q=${encodeURIComponent(helmet.set_number)}`;
  dom.modalBrickLink.href     = `https://www.bricklink.com/v2/catalog/catalogitem.page?S=${encodeURIComponent(helmet.set_number)}-1`;

  // Fav button
  syncModalFavBtn(helmet.id);

  // Navigation position
  updateModalNav();
}

function generateDescription(helmet) {
  const descriptions = {
    dark: [
      `Une pièce de collection majestueuse du Côté Obscur — ${helmet.name} incarne la puissance sombre de la galaxie. Édition ${helmet.series}, ${helmet.year}.`,
      `Capturant l'essence menaçante de ${helmet.name}, cette réplique Lego se distingue par son attention aux détails et sa fidélité à l'œuvre originale. Série ${helmet.series}.`,
    ],
    light: [
      `Symbole d'espoir et de lumière, ${helmet.name} est présenté ici dans toute sa gloire héroïque. Une pièce incontournable de la série ${helmet.series}.`,
      `Hommage au courage et à la destinée, ce casque ${helmet.name} illustre l'élégance du Côté Lumineux. Édition ${helmet.year}, série ${helmet.series}.`,
    ]
  };
  const arr = descriptions[helmet.side] || descriptions.light;
  const idx = typeof helmet.id === 'number'
    ? helmet.id % arr.length
    : Math.abs(helmet.name.length) % arr.length;
  return arr[idx] ?? arr[0];
}

function syncModalFavBtn(id) {
  const isFav = state.favorites.has(id);
  const btn = dom.modalFavBtn;
  btn.classList.toggle('active', isFav);
  btn.setAttribute('aria-pressed', String(isFav));
  btn.setAttribute('aria-label', isFav ? 'Retirer des favoris' : 'Ajouter aux favoris');

  const path = btn.querySelector('path');
  if (path) {
    path.setAttribute('fill', isFav ? 'currentColor' : 'none');
  }
}

function navigateModal(dir) {
  const list = state.modal.filteredList;
  if (!list.length) return;

  const currentIndex = list.indexOf(state.modal.currentId);
  if (currentIndex === -1) return;

  let newIndex = currentIndex + dir;
  if (newIndex < 0) newIndex = list.length - 1;
  if (newIndex >= list.length) newIndex = 0;

  const newId = list[newIndex];
  const helmet = state.helmets.find(h => h.id === newId);
  if (helmet) {
    state.modal.currentId = newId;
    // Animate image out and back
    dom.modalImage.style.opacity = '0';
    dom.modalImage.style.transform = `translateX(${dir > 0 ? '20px' : '-20px'})`;
    setTimeout(() => {
      populateModal(helmet);
      dom.modalImage.style.transition = 'opacity 0.2s ease, transform 0.25s ease';
      dom.modalImage.style.opacity = '1';
      dom.modalImage.style.transform = 'translateX(0)';
      // Reset after transition
      setTimeout(() => {
        dom.modalImage.style.transition = '';
        dom.modalImage.style.transform = '';
      }, 250);
    }, 100);
  }
}

function updateModalNav() {
  const list = state.modal.filteredList;
  const index = list.indexOf(state.modal.currentId);
  dom.modalNavPos.textContent = `${index + 1} / ${list.length}`;
}

// ─────────────────────────────────────────────
// EVENT BINDING
// ─────────────────────────────────────────────
function bindEvents() {

  // Series filter pills
  dom.filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      state.filters.series = pill.dataset.value;
      syncSeriesPills();
      applyFilters();
    });
  });

  // Force side toggles
  dom.forceToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const side = btn.dataset.side;
      if (state.filters.side === side) {
        state.filters.side = null; // deactivate
      } else {
        state.filters.side = side;
      }
      syncForceToggles();
      applyFilters();
    });
  });

  // Sort
  dom.sortSelect.addEventListener('change', () => {
    state.filters.sort = dom.sortSelect.value;
    applyFilters();
  });

  // Search
  let searchTimeout;
  dom.searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const val = dom.searchInput.value.trim();
    dom.searchClear.hidden = val.length === 0;
    searchTimeout = setTimeout(() => {
      state.filters.search = val;
      applyFilters();
    }, 220);
  });

  dom.searchClear.addEventListener('click', () => {
    dom.searchInput.value = '';
    dom.searchClear.hidden = true;
    state.filters.search = '';
    applyFilters();
    dom.searchInput.focus();
  });

  // Clear all
  dom.clearAllBtn.addEventListener('click', clearAllFilters);
  dom.emptyReset.addEventListener('click', clearAllFilters);

  // View toggles
  dom.viewGrid.addEventListener('click', () => setView('grid'));
  dom.viewList.addEventListener('click', () => setView('list'));

  // Modal close
  dom.modalClose.addEventListener('click', closeModal);
  dom.backdrop.addEventListener('click', (e) => {
    if (e.target === dom.backdrop) closeModal();
  });

  // Modal navigation
  dom.modalNavPrev.addEventListener('click', () => navigateModal(-1));
  dom.modalNavNext.addEventListener('click', () => navigateModal(+1));

  // Modal favorite
  dom.modalFavBtn.addEventListener('click', () => {
    if (state.modal.currentId !== null) {
      toggleFavorite(state.modal.currentId);
      // Also refresh the card in the grid
      const card = dom.grid.querySelector(`[data-id="${state.modal.currentId}"] .card-fav-btn`);
      if (card) {
        const isFav = state.favorites.has(state.modal.currentId);
        card.classList.toggle('active', isFav);
        card.setAttribute('aria-pressed', String(isFav));
        const path = card.querySelector('path');
        if (path) path.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
    }
  });

  // Nav favorites link — filtre la grille sur les favoris
  document.querySelector('.js-open-favorites')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.favorites.size === 0) return;
    // Appliquer un filtre temporaire sur les favoris
    state.filtered = state.helmets.filter(h => state.favorites.has(h.id));
    renderGrid();
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!state.modal.open) return;

    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigateModal(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigateModal(+1);
        break;
    }
  });

  // Focus trap in modal
  dom.backdrop.addEventListener('keydown', (e) => {
    if (!state.modal.open || e.key !== 'Tab') return;

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input',
      'select',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    const focusable = [...dom.modal.querySelectorAll(focusableSelectors)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────
init();
