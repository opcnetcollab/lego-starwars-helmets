# DESIGN.md — Lego Star Wars Helmets
> Design System **v2.0** — Refonte UX Cinématique 2024
> Mis à jour le 2026-03-17 par UX Designer (ux-vision pipeline)

---

## 🎯 Direction Artistique

### Inspiration dominante : **Fusion Cinématique des Séries Récentes**

Le site fusionne l'esthétique de quatre univers visuels récents pour créer une expérience **premium, immersive et gritty** :

| Influence | Apport visuel | Utilisation |
|-----------|--------------|-------------|
| **The Mandalorian** | Beskar métal brossé, chrome mat, western spatial | Fond principal, matière des cards |
| **Andor** | Gris acier industriel, bleu impérial froid, ambiance rebelle adulte | Filtres, barres d'info, accent Obscur |
| **Ahsoka** | Cosmique blanc/bleu mystique, brumes galactiques | Côté Lumineux, hero glow |
| **The Acolyte** | Violet/rouge sombre, particules de Force noire | Côté Obscur, particles, CTA |

**Mood global** : Cinéma de science-fiction premium — sombre, profond, avec des reflets métalliques froids. Chaque casque est traité comme une **pièce de collection muséale** dans une vitrine galactique.

**v2 — Évolution** : De galerie passive → **expérience de collection interactive**. L'utilisateur peut explorer, filtrer, et découvrir chaque casque dans son contexte narratif.

---

## 🎨 Palette de Couleurs

### Fondations

```css
--color-void:       #060810;  /* Fond principal — espace profond */
--color-deep-space: #0b0f1a;  /* Fond secondaire — couche 2 */
--color-nebula:     #111827;  /* Fond cards — couche 3 */
--color-steel:      #1c2535;  /* Surfaces élevées — glassmorphism */
--color-chrome:     #252f42;  /* Borders, séparateurs */
```

### Texte

```css
--color-text-primary:   #e8eaf0;  /* Blanc beskar — titres */
--color-text-secondary: #8892a4;  /* Gris holographique — body text */
--color-text-muted:     #4a5568;  /* Muted — labels, meta */
```

### Accents — Côtés de la Force

```css
/* ⚡ Côté Lumineux (Ahsoka / Jedi) */
--color-light-primary:  #4fc3f7;  /* Bleu Force — ciel d'Ahsoka */
--color-light-glow:     rgba(79, 195, 247, 0.25);
--color-light-soft:     rgba(79, 195, 247, 0.12);

/* 🔴 Côté Obscur (The Acolyte / Sith) */
--color-dark-primary:   #e53935;  /* Rouge Sith */
--color-dark-purple:    #7b1fa2;  /* Violet Force noire */
--color-dark-glow:      #d32f2f;  /* Glow obscur */
--color-dark-soft:      rgba(229, 57, 53, 0.12);

/* Chrome Mandalorian */
--color-chrome-light:   #b0bec5;  /* Beskar clair */
--color-chrome-mid:     #78909c;  /* Beskar medium */
```

### v2 — Nouveaux tokens

```css
/* Or Galactique — accentuation premium, badges, séparateurs */
--color-gold-accent:    #c8a84b;

/* Surface hover subtile */
--color-surface-hover:  rgba(255, 255, 255, 0.04);

/* Border glow interactive */
--color-border-glow:    rgba(79, 195, 247, 0.3);
```

### Accents par Série

```css
--series-original:      #ffd54f;  /* Or Empire / Rébellion */
--series-prequel:       #66bb6a;  /* Vert Jedi / Gungan */
--series-sequel:        #ef5350;  /* Rouge Premier Ordre */
--series-mando:         #90a4ae;  /* Beskar Mandalorian */
--series-clone-wars:    #26c6da;  /* Bleu République */
--series-divers:        #9e9e9e;  /* Gris neutre */
```

---

## ✏️ Typographie

### Familles

```css
--font-display:  'Orbitron', 'Rajdhani', sans-serif;  /* Titres — SF militaire */
--font-body:     'Inter', 'DM Sans', sans-serif;      /* Corps — lisibilité premium */
--font-mono:     'JetBrains Mono', 'Fira Code', monospace; /* Set numbers, codes */
```

### Échelle typographique

| Rôle | Font | Taille | Poids | Letter-spacing |
|------|------|--------|-------|----------------|
| Hero Title | Orbitron | `clamp(3rem, 8vw, 6rem)` | 800 | `0.08em` |
| Hero Subtitle | Inter | `clamp(1rem, 2.5vw, 1.25rem)` | 400 | `0.1em` |
| Hero Stat Value | JetBrains Mono | `1.5rem` | 600 | — |
| Section Header | Orbitron | `1.5rem` | 700 | `0.08em` |
| Modal Title | Orbitron | `1.6rem` | 700 | `0.04em` |
| Card Title | Orbitron | `0.82rem` | 600 | `0.04em` |
| Card Meta | Inter | `0.68rem` | 400 | `0.02em` |
| Filter Label | Inter | `0.72rem` | 600 | `0.06em` |
| Spec Label | Inter | `0.62rem` | 600 | `0.1em` uppercase |
| Spec Value | JetBrains Mono | `0.82rem` | 600 | — |
| Footer | Inter | `0.8rem` | 400 | `0.03em` |

---

## 🏗️ Composants Détaillés — v2

### 1. Hero Section (v2)

**Changements v2 :**
- Hauteur réduite : `72vh` (vs `100vh` v1) — moins d'espace perdu, reach de la collection plus rapide
- Stats numériques visibles : 4 compteurs (casques, séries, lumineux, obscur)
- Badge "Édition 2024" en gold
- Casque flottant animé en décoration droite (illustratif)

```
┌─────────────────────────────────────────────────────┐
│  [Nébuleuses bg — dark gauche, light droite]        │
│                                                     │
│  [Badge ✦ 24 casques · Collection 2024]            │  ← v2
│  [Logo micro]                                       │
│                                                     │
│    HELMET                                           │        🪖
│    COLLECTION                                       │      (float)
│                                                     │
│  [24 Casques] | [6 Séries] | [12 Obscur] | [12 Lum]│  ← v2
│                                                     │
│    [ ▼  Explorer la collection ]                    │
└─────────────────────────────────────────────────────┘
```

### 2. Barre de Filtres Sticky Glassmorphism (v2)

**Changements v2 :**
- **Sort dropdown** ajouté (par nom, année ↑↓, série)
- **Bouton clear** sur l'input search
- **Dots colorés** sur chaque bouton de série (point de la couleur série)
- **Compteurs** dans chaque filtre (badges numériques)
- **Active filter tags** : pills supprimables sous les filtres → visibilité des filtres actifs
- **"Tout effacer"** : lien pour reset tout en un clic

```
┌──────────────────────────────────────────────────────────────────┐
│ 🔍 [Rechercher "Darth"  ✕]       [Trier par : Série ▼]         │
│                                                                  │
│ [Tous 24] [●Originale 8] [●Prélogie 5] [●Sequel 4] [●Mando 4]  │
│ [●Clone Wars 2] [●Divers 1]  |  [💙Lumineux 12] [🔴Obscur 12]  │
│                                                                  │
│ FILTRES : [Sequel ✕] [🔴Obscur ✕] ["Darth" ✕]  Tout effacer    │
└──────────────────────────────────────────────────────────────────┘
```

**CSS clé — Filter pills v2 :**
```css
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);  /* ← v2 : pill vs rectangle v1 */
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  transition: all var(--transition-smooth);
}

/* Dot couleur série */
.filter-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
}

/* Badge compteur dans le filtre */
.filter-count {
  background: rgba(255,255,255,0.08);
  border-radius: var(--radius-pill);
  padding: 1px 5px;
  font-size: 0.62rem;
}

/* Active filter tag (supprimable) */
.active-filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(79,195,247,0.1);
  border: 1px solid rgba(79,195,247,0.25);
  border-radius: var(--radius-pill);
  padding: 3px 8px 3px 10px;
  font-size: 0.7rem;
}
```

### 3. Count Bar (v2)

**Changements v2 :**
- Contexte enrichi : affiche les filtres actifs dans le texte (`3 casques · Sequel · 🔴 Obscur · "Darth"`)
- **Toggle vue** : boutons grille/liste à droite

```
▸ 3 casque(s) · Sequel · 🔴 Obscur · "Darth"           [⊞] [☰]
```

### 4. Cards Casques (v2)

**Changements v2 :**
- **Quick actions au hover** : boutons 🔍 (détail) et ♡ (favoris) apparaissent slide-in à droite
- **Barre de progression année** : fine barre 2px en bas, gradient dark→light proportionnel à l'année (1977→2024)
- **Zoom image au hover** : image scale(1.06) + filter glow coloré selon côté de la Force
- **Scanline effect** : overlay subtil au hover pour effet écran holographique

```
┌─────────────────────────────┐
│  [Badge série]  [Badge côté]│  ← Pills ronds (vs rectangles v1)
│                         [🔍]│  ← v2 : Quick actions (apparaît au hover)
│      [Image casque]     [♡] │
│       (zoom + glow)         │
│─────────────────────────────│
│  Nom du casque              │
│  Série · Année     #75304   │
│═════════════════════════════│  ← v2 : Barre année (2px, gradient)
└─────────────────────────────┘
```

**CSS clé — Quick actions :**
```css
.card-actions {
  position: absolute;
  top: 12px; right: 12px;
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.helmet-card:hover .card-actions {
  opacity: 1;
  transform: translateX(0);
}

/* Zoom image */
.helmet-card:hover .card-image img {
  transform: scale(1.06) translateY(-4px);
  filter: drop-shadow(0 0 20px rgba(79,195,247,0.3));
}
.helmet-card[data-side="dark"]:hover .card-image img {
  filter: drop-shadow(0 0 20px rgba(229,57,53,0.3));
}

/* Barre année */
.card-year-bar { height: 2px; }
.card-year-bar__fill {
  background: linear-gradient(90deg, var(--color-dark-purple), var(--color-light-primary));
}
```

### 5. Modal de Détail Casque (v2 — NOUVEAU)

**Composant entièrement nouveau.** Remplace le comportement "rien ne se passe au clic" de v1.

**Layout :** Modal centré, 2 colonnes, max-width 860px  
**Animation :** `scale(0.92) → scale(1)` + `translateY(20px) → 0` avec spring easing  
**Fermeture :** Clic sur ✕, Escape, ou clic sur le backdrop  
**Navigation :** Flèches gauche/droite externes pour passer au casque suivant/précédent

```
┌────────────────────────────────────────────────────┐
│                                           [✕ Close]│
│ ┌──────────────────┐ ┌──────────────────────────┐  │
│ │   [Nébuleuse]    │ │  [Badge série]            │  │
│ │                  │ │  Nom du Casque            │  │
│ │    🪖 float     │ │  #75304 · LEGO SW         │  │
│ │                  │ │  ┌──────────────────────┐ │  │
│ │  [Thumbs x3]     │ │  │ SET# │ ANNÉE │ SÉRIE │ │  │
│ │                  │ │  │ CÔTÉ │PIÈCES │ DIFF  │ │  │
│ │  [🔴 Obscur ●]  │ │  └──────────────────────┘ │  │
│ └──────────────────┘ │  Description narrative... │  │
│                      │  [🛒 LEGO.com] [🔗 Brick] │  │
│ └──────────────────────────────────────────────┘  │
│  CASQUES LIÉS : [Vador] [Luke] [Storm] [Boba]...  │
└────────────────────────────────────────────────────┘
```

**Détails modal :**

```css
/* Entrée */
.helmet-modal {
  animation: modalEnter 0.35s cubic-bezier(0.34, 1.3, 0.64, 1);
}
@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Colonne visuelle */
.modal-visual {
  background: linear-gradient(160deg, rgba(28,37,53,0.9), rgba(11,15,26,0.95));
  border-right: 1px solid rgba(176,190,197,0.1);
}

/* Specs table */
.modal-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(176,190,197,0.08);  /* Border trick */
  border-radius: var(--radius-sm);
  overflow: hidden;
}

/* CTA primaire (couleur selon côté) */
.modal-cta-primary {
  background: linear-gradient(135deg, rgba(229,57,53,0.2), rgba(123,31,162,0.2));
  border: 1px solid rgba(229,57,53,0.4);
  /* Pour Lumineux : rgba(79,195,247,0.2) + rgba(41,182,246,0.4) */
}
```

**Sections du modal :**
1. **Header** : badge série, titre, set#, boutons favoris/partager
2. **Specs grid** : Set#, Année, Série, Côté, Pièces, Difficulté
3. **Description** : texte narratif avec border-left colored
4. **CTA footer** : LEGO.com (primary) + Bricklink (secondary) + compteur `3/24`
5. **Casques liés** : scroll horizontal des autres casques de la même série

### 6. Barre de Recherche Holographique (inchangée v1)

```css
.search-input:focus {
  border-color: var(--color-light-primary);
  box-shadow: 
    0 0 0 3px rgba(79,195,247,0.12),
    0 0 16px rgba(79,195,247,0.15);
}
```

### 7. État vide (inchangé v1)

```
  🔭
  Aucun casque trouvé
  dans cette région de la galaxie.
  [ Réinitialiser les filtres ]
```

### 8. Footer (inchangé v1)

```
────────── ✦ ──────────
Lego Star Wars Helmets — Collection non officielle
May the Force be with you. 🌟
© 2024 · Données : Bricklink · v2.0
```

---

## ✨ Animations & Effets Spéciaux

### Fond étoilé animé (3 couches) — inchangé v1

### Particules de Force (canvas) — inchangé v1

### v2 — Nouvelles animations

#### Casque flottant dans le hero
```css
@keyframes helmFloat {
  0%,100% { transform: translateY(0) rotate(-2deg); }
  50%      { transform: translateY(-18px) rotate(2deg); }
}
```

#### Dot pulsant (badge Côté de la Force dans modal)
```css
@keyframes pulseDot {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.6); opacity: 0.6; }
}
```

#### Shimmer titre hero (v2 — angle ajusté)
```css
@keyframes shimmer {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}
```

#### Modal entrée
```css
@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
```

#### Quick actions card slide-in
```css
/* Au hover card → transition depuis translateX(8px) vers 0 */
transition: opacity 0.2s ease, transform 0.25s ease;
```

### Tokens d'animation

```css
--transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);  /* Spring pour hover card */
--transition-smooth: 0.25s cubic-bezier(0.4, 0, 0.2, 1);       /* Material ease-out */
--transition-fast:   0.15s ease;                                 /* Micro-interactions */
```

### Préférence reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .helmet-card { transition: none; }
  .modal-helmet-img { animation: none; }
  .hero-title__main { animation: none; }
  .stars-layer { animation: none; }
}
```

---

## 📐 Responsive Design

### Breakpoints (inchangés v1)

```css
--bp-mobile:   375px;
--bp-tablet:   768px;
--bp-laptop:  1024px;
--bp-desktop: 1280px;
--bp-wide:    1536px;
```

### Grille de casques

| Breakpoint | Colonnes | Gap | Card min-width |
|-----------|----------|-----|----------------|
| Mobile (< 430px) | 2 | 12px | 160px |
| Mobile L (430-768px) | 2 | 16px | 180px |
| Tablet (768-1024px) | 3 | 20px | 220px |
| Laptop (1024-1280px) | 4 | 24px | 240px |
| Desktop (1280px+) | 5 | 24px | 240px |
| Wide (1536px+) | 6 | 28px | 260px |

### Modal responsive (v2)

```css
/* Desktop → 2 colonnes */
.modal-layout { grid-template-columns: 320px 1fr; }

/* Tablet → stack vertical */
@media (max-width: 768px) {
  .modal-layout { grid-template-columns: 1fr; }
  .modal-visual { min-height: 240px; }
  .helmet-modal { max-width: 96vw; border-radius: 16px; }
}

/* Mobile → quasi plein écran, drawer du bas */
@media (max-width: 480px) {
  .helmet-modal {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
    overflow-y: auto;
  }
}
```

### Filtres responsive (v2)

```css
/* Mobile : sort masqué, active tags sur 2 lignes */
@media (max-width: 768px) {
  .sort-select { display: none; }
  .filters-row { overflow-x: auto; flex-wrap: nowrap; }
  .active-filters { padding-top: 6px; }
}
```

---

## 🖼️ Maquettes Générées

> ⚠️ MCP Stitch non disponible dans l'environnement courant (non configuré dans mcporter.json).
> Les maquettes ont été générées comme fichiers HTML haute-fidélité autonomes.

### Écran 1 — Page principale v2 (Hero compact + Filtres v2 + Grille)
- **Fichier HTML :** `.stitch/designs/lego-sw-helmets-v2-main.html`
- **Contenu :** Hero 72vh avec stats, filtres pills avec compteurs, active filter tags, sort dropdown, toggle vue grille/liste, 3 cards démo avec quick actions, barre d'année

### Écran 2 — Modal de détail casque (NOUVEAU v2)
- **Fichier HTML :** `.stitch/designs/lego-sw-helmets-v2-detail.html`
- **Contenu :** Modal 2 colonnes, thumbnails multiples, specs grid, description, CTA LEGO.com/Bricklink, casques liés scroll horizontal, navigation prev/next

---

## 🚀 Checklist d'Implémentation v2

### Phase 1 — Nouvelles variables CSS (tokens v2)
- [ ] `--color-gold-accent`, `--color-surface-hover`, `--color-border-glow`
- [ ] `--radius-pill`, `--transition-bounce`, `--transition-smooth`, `--transition-fast`
- [ ] Tokens d'animation (`--anim-spring`, `--anim-modal`)

### Phase 2 — Hero v2
- [ ] Réduire hauteur hero à `72vh`
- [ ] Ajouter `.hero-badge` gold
- [ ] Ajouter `.hero-stats` avec 4 compteurs dynamiques
- [ ] Casque flottant illustratif (optionnel — décor right)

### Phase 3 — Filtres v2
- [ ] Transformer `.filter-btn` en pills (`border-radius: 999px`)
- [ ] Ajouter `.filter-dot` (cercle couleur série dans chaque bouton)
- [ ] Ajouter `.filter-count` (badge numérique dynamique)
- [ ] Ajouter `<select class="sort-select">` avec options nom/année/série
- [ ] Bouton clear sur l'input search
- [ ] Composant `.active-filters` : afficher les filtres actifs comme tags supprimables
- [ ] Lien "Tout effacer" pour reset complet

### Phase 4 — Count bar v2
- [ ] Afficher les filtres actifs dans le texte du compteur
- [ ] Ajouter toggle boutons grille/liste `.count-bar__views`

### Phase 5 — Cards v2
- [ ] Ajouter `.card-actions` (quick actions slide-in au hover)
- [ ] Ajouter `.card-year-bar` (barre 2px en bas, progression calculée en JS)
- [ ] Améliorer zoom image au hover avec glow coloré selon `data-side`
- [ ] Scanline effect (`::before` pseudo-element, opacity 0→1 au hover)

### Phase 6 — Modal de détail (NOUVEAU — priorité haute)
- [ ] Composant `.helmet-modal` avec layout 2 colonnes
- [ ] Colonne visuelle : image flottante, thumbnails variants, badge côté pulsant
- [ ] Colonne contenu : header + specs grid + description + CTA footer
- [ ] Section `.modal-related` : strip scroll horizontal des casques liés
- [ ] Navigation prev/next entre casques
- [ ] Fermeture : ✕, Escape, backdrop click
- [ ] Animation entrée/sortie modale
- [ ] Responsive : stack vertical ≤768px, bottom sheet ≤480px

### Phase 7 — JS v2
- [ ] `computeFilterCounts()` : compter les casques par série/côté dynamiquement
- [ ] `renderActiveFilterTags()` : afficher/supprimer les tags de filtres actifs
- [ ] `sortHelmets(by)` : implémenter le tri (nom, année, série)
- [ ] `openHelmetModal(id)` : ouvrir/fermer le modal + charger les données du casque
- [ ] `navigateModal(dir)` : prev/next dans la liste filtrée
- [ ] `computeYearProgress(year)` : calculer le % pour la barre d'année (1977–2024)
- [ ] `toggleView(mode)` : basculer grille/liste
- [ ] Gestionnaire Escape pour fermer le modal

### Phase 8 — Polish & Accessibilité
- [ ] `aria-modal="true"` + `role="dialog"` sur le modal
- [ ] Focus trap dans le modal
- [ ] `aria-label` sur tous les boutons d'action
- [ ] Focus visible custom (ring bleu Force)
- [ ] `prefers-reduced-motion` : désactiver animations
- [ ] Lazy loading images (`loading="lazy"`)
- [ ] `will-change: transform` sur les cards (perf)

---

## 📊 Récapitulatif des Améliorations v1 → v2

| Composant | v1 | v2 | Impact UX |
|-----------|----|----|-----------|
| Hero | 100vh (trop grand) | 72vh + stats visibles | Reach collection +30% plus rapide |
| Filtres | Boutons rectangulaires | Pills colorées + compteurs | Identification série immédiate |
| Filtres actifs | Invisibles | Tags supprimables | Compréhension état filtre +++ |
| Recherche | Input basique | + bouton clear + sort | Efficacité tâche recherche |
| Cards | Statiques au hover | Quick actions + zoom glow + barre année | Engagement +++ |
| Clic card | Rien | Modal détail complet | Conversion info-produit |
| Modal | Absent | 2 cols + specs + liés + CTA | Profondeur de découverte |
| Navigation | — | Prev/next entre casques | Exploration fluide |
| Vue | Grille fixe | Toggle grille/liste | Préférence utilisateur |
