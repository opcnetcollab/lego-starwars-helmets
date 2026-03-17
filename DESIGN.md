# DESIGN.md — Lego Star Wars Helmets
> Design System **v3.0** — White Gallery Luxe
> Généré le 2026-03-17 par UX Designer (ux-vision pipeline)
> Maquettes Stitch : `.stitch/designs/v3/` (3 écrans haute-fidélité)

---

## 🎯 Direction Artistique v3

### Concept : **White Gallery Luxe — Musée d'Art Contemporain**

**Rupture radicale avec le v2.** Fini le fond spatial noir, les nébuleuses, les lueurs néon. Place à une esthétique que personne n'attend pour un site Star Wars : le blanc immaculé d'une galerie d'art premium.

| Référence | Apport visuel | Utilisation |
|-----------|--------------|-------------|
| **Sotheby's / Christie's** | Typographie éditoriale, espace vide aristocratique | Hero, layout général |
| **Leica Gallery** | Blanc parfait, photos comme œuvres, sobre | Cards, modal détail |
| **MoMA Store** | Grilles propres, metadata précise, sans-serif clinique | Filtres, specs grid |
| **Phaidon (livres d'art)** | Serif classique + grotesque moderne, mise en page respirante | Typographie mixte |

**Justification :** Les casques Star Wars Lego sont de vraies pièces de collection — certaines valent plusieurs centaines d'euros en édition limitée. Les traiter comme des œuvres d'art exposées dans une galerie blanche leur donne une **dignité visuelle** qu'aucun fond sombre ne peut offrir. Le contraste avec les attentes est un outil de mémorisation : ce site *surprend* avant de convaincre.

**Mot clé v3 :** *Provenance*. Chaque casque est présenté avec la rigueur documentaire d'une fiche d'œuvre de musée.

---

## 🎨 Palette de Couleurs v3

### Fondations

```css
/* Surfaces */
--color-white:          #FFFFFF;   /* Fond principal — blanc muséal pur */
--color-ivory:          #FAFAF8;   /* Fond alternatif — ivoire chaud */
--color-cream:          #F5F4F1;   /* Fond section, backdrop modal */
--color-smoke:          #EBEBEB;   /* Bordures légères, séparateurs */
--color-mist:           #E5E7EB;   /* Bordures standard */
```

### Texte

```css
--color-text-primary:   #1A1A1A;   /* Charbon profond — titres, corps */
--color-text-secondary: #6B7280;   /* Gris moyen — subtitles, labels */
--color-text-muted:     #9CA3AF;   /* Gris clair — metadata, tags */
--color-text-ghost:     #D1D5DB;   /* Gris fantôme — placeholder */
```

### Accents Gold

```css
--color-gold:           #C9A84C;   /* Or chaud — accent principal, règles */
--color-gold-light:     #E8C97A;   /* Or clair — hover states */
--color-gold-dim:       rgba(201, 168, 76, 0.15); /* Or translucide — backgrounds */
--color-gold-border:    rgba(201, 168, 76, 0.4);  /* Or bordure */
```

### Côtés de la Force (v3 — subtils)

```css
/* ⚡ Côté Lumineux — bleu acier froid vs bleu électrique v2 */
--color-light:          #2D6EA8;   /* Bleu acier — sobre, classe */
--color-light-soft:     rgba(45, 110, 168, 0.08);
--color-light-border:   rgba(45, 110, 168, 0.25);

/* 🔴 Côté Obscur — bordeaux vieilli vs rouge Sith criard v2 */
--color-dark:           #8B0000;   /* Bordeaux profond — viril, contenu */
--color-dark-soft:      rgba(139, 0, 0, 0.06);
--color-dark-border:    rgba(139, 0, 0, 0.2);
```

### Accents par Série (v3 — pastels sophistiqués)

```css
--series-original:      #B8860B;   /* Or antique — Trilogie Originale */
--series-prequel:       #2E7D32;   /* Vert sauge — Prélogie */
--series-sequel:        #37474F;   /* Acier bleuté — Sequel */
--series-mando:         #5D4037;   /* Bronze cuivré — Mandalorian */
--series-clone-wars:    #0277BD;   /* Bleu République — Clone Wars */
--series-divers:        #616161;   /* Gris neutre — Divers */
```

---

## ✏️ Typographie v3

### Familles

```css
--font-serif:    'Playfair Display', 'Cormorant Garamond', Georgia, serif; /* Titres — noblesse */
--font-body:     'Inter', 'DM Sans', system-ui, sans-serif;               /* Corps — lisibilité */
--font-mono:     'JetBrains Mono', 'Fira Code', monospace;                /* Set numbers — précision */
```

> Import Google Fonts :
> `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');`

### Échelle typographique v3

| Rôle | Font | Taille | Poids | Letter-spacing | Note |
|------|------|--------|-------|----------------|------|
| Hero Title | Playfair Display | `clamp(3.5rem, 7vw, 5.5rem)` | 300 | `0.02em` | Léger, élégant |
| Hero Subtitle | Inter | `0.85rem` | 400 | `0.2em` | Uppercase, tracé |
| Hero Stats | JetBrains Mono | `1.4rem` | 400 | — | Chiffres précis |
| Nav Brand | Playfair Display | `1.1rem` | 400 | `0.05em` | |
| Nav Links | Inter | `0.72rem` | 500 | `0.12em` | Small caps |
| Section Header | Inter | `0.65rem` | 600 | `0.2em` | Uppercase tracé |
| Card Name | Inter | `0.78rem` | 600 | `0.06em` | Small caps |
| Card Meta | Inter | `0.65rem` | 400 | `0.02em` | Gray |
| Card Set# | JetBrains Mono | `0.6rem` | 400 | — | Gold muted |
| Filter Label | Inter | `0.68rem` | 500 | `0.1em` | Uppercase |
| Modal Title | Playfair Display | `2rem` | 400 | `0.01em` | Serif classique |
| Spec Label | Inter | `0.58rem` | 600 | `0.15em` | Uppercase, gray |
| Spec Value | Inter | `0.78rem` | 600 | — | Charcoal |
| Description | Playfair Display | `0.9rem` | 400 | — | Italic, prose |
| Footer | Inter | `0.7rem` | 400 | `0.05em` | Centered |

---

## 🏗️ Composants Clés v3

### 1. Navigation Bar

```
┌────────────────────────────────────────────────────┐
│  HELMET COLLECTION         Collection  Favorites   │
│  (Playfair Display)        About                   │
│────────────────────────────────────────────────────│  ← 1px gold #C9A84C
```

**CSS clé :**
```css
.navbar {
  background: #fff;
  border-bottom: 1px solid var(--color-gold);
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-brand {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
}
.nav-link {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}
.nav-link:hover { color: var(--color-text-primary); }
```

---

### 2. Hero Section

```
┌────────────────────────────────────────────────────┐
│                                                    │
│              HELMET COLLECTION                     │
│         (Playfair Display, 300 weight)             │
│                                                    │
│      LEGO STAR WARS · 24 PIÈCES · 6 SÉRIES        │
│              ─────────────────                     │
│        ← thin gold rule 120px wide →              │
│                                                    │
│    24 Helmets   6 Series   12 Light   12 Dark      │
│    (monospace)                                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

**CSS clé :**
```css
.hero {
  padding: 120px 48px;
  text-align: center;
  background: var(--color-white);
}
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 7vw, 5.5rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.hero-subtitle {
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}
.hero-rule {
  width: 120px;
  height: 1px;
  background: var(--color-gold);
  margin: 0 auto 40px;
}
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
}
.hero-stat-value {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  color: var(--color-text-primary);
  display: block;
}
.hero-stat-label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```

---

### 3. Barre de Filtres v3

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ALL · ORIGINAL TRILOGY · PREQUEL · SEQUEL · MANDO · CLONE  │
│  ───                                                         │
│  (active = thin gold underline, no fill)                    │
│                                         [LIGHT SIDE] [DARK] │
│                                         [Search...        ] │
│ FILTRES : [Original Trilogy ×] [Dark ×]     Clear all       │
└──────────────────────────────────────────────────────────────┘
```

**CSS clé :**
```css
.filter-bar {
  background: var(--color-white);
  border-top: 1px solid var(--color-mist);
  border-bottom: 1px solid var(--color-mist);
  padding: 20px 48px;
  position: sticky;
  top: 61px;  /* navbar height */
  z-index: 100;
}
.filter-pill {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
}
.filter-pill:hover { color: var(--color-text-primary); }
.filter-pill.active {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-gold);
}
.force-toggle {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid var(--color-mist);
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.force-toggle.active[data-side="light"] {
  border-color: var(--color-light-border);
  background: var(--color-light-soft);
  color: var(--color-light);
}
.force-toggle.active[data-side="dark"] {
  border-color: var(--color-dark-border);
  background: var(--color-dark-soft);
  color: var(--color-dark);
}
.search-input {
  border: none;
  border-bottom: 1px solid var(--color-mist);
  background: transparent;
  font-size: 0.75rem;
  color: var(--color-text-primary);
  padding: 4px 0;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-bottom-color: var(--color-gold); }
.active-filter-tag {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  padding: 2px 8px 2px 10px;
  border: 1px solid var(--color-gold-border);
  background: var(--color-gold-dim);
  color: var(--color-text-secondary);
  cursor: pointer;
}
```

---

### 4. Card Casque v3

```
┌──────────────────────────────┐
│                              │
│     [Image casque]           │  ← fond blanc pur, image centrée
│     (fond #FFFFFF)           │     hover: scale(1.03)
│                              │
│  DARTH VADER                 │  ← small-caps Inter
│  Original Trilogy · 2021     │  ← gray
│  #75304                      │  ← gold monospace tiny
│                              │
│  [♡]                         │  ← icône discète top-right (hover only)
└──────────────────────────────┘
  (thin gold border au hover)
```

**CSS clé :**
```css
.helmet-card {
  background: var(--color-white);
  border: 1px solid var(--color-smoke);
  padding: 24px 20px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}
.helmet-card:hover {
  border-color: var(--color-gold);
  box-shadow: 0 4px 24px rgba(201, 168, 76, 0.1);
}
.card-image-wrap {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  overflow: hidden;
}
.card-image-wrap img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.35s ease;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.06));
}
.helmet-card:hover .card-image-wrap img {
  transform: scale(1.05) translateY(-4px);
  filter: drop-shadow(0 16px 28px rgba(0,0,0,0.1));
}
.card-name {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  margin-top: 16px;
}
.card-meta {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.card-set {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--color-gold);
  margin-top: 4px;
}
.card-fav-btn {
  position: absolute;
  top: 12px; right: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.9rem;
}
.helmet-card:hover .card-fav-btn { opacity: 1; }
.card-fav-btn.active { opacity: 1; color: var(--color-gold); }
```

---

### 5. Modal Détail Casque v3

```
╔═══════════════════════════════════════════════════════════╗
║                                                       [✕] ║
║  ┌──────────────────┐  ┌────────────────────────────────┐ ║
║  │                  │  │  SET #75304                    │ ║
║  │   [Image large]  │  │  DARTH VADER                   │ ║
║  │    (float anim)  │  │  ─────────────────────         │ ║
║  │                  │  │  SET NO  75304  │  YEAR  2021  │ ║
║  │ [□] [□] [□]      │  │  SERIES  Orig.  │  SIDE  Dark  │ ║
║  │  (thumbnails)    │  │  PIECES  834    │  ★★★★☆       │ ║
║  │  [● DARK SIDE]   │  │                                │ ║
║  │  ← ·1/24· →     │  │  "An iconic piece from the     │ ║
║  └──────────────────┘  │  Original Trilogy..."          │ ║
║                        │                                │ ║
║                        │  [SHOP LEGO.COM] [BRICKLINK]   │ ║
║                        └────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════╝
```

**CSS clé :**
```css
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(250, 250, 248, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.helmet-modal {
  background: var(--color-white);
  border: 1px solid var(--color-mist);
  max-width: 900px;
  width: 94vw;
  display: grid;
  grid-template-columns: 360px 1fr;
  animation: modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 24px 80px rgba(0,0,0,0.08);
}
@keyframes modalEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-visual {
  background: var(--color-ivory);
  border-right: 1px solid var(--color-mist);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.modal-image {
  max-width: 240px;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
  animation: floatSlow 4s ease-in-out infinite;
}
@keyframes floatSlow {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
.modal-thumbs { display: flex; gap: 8px; }
.modal-thumb {
  width: 40px; height: 40px;
  border: 1px solid var(--color-mist);
  object-fit: contain;
  cursor: pointer;
  transition: border-color 0.2s;
}
.modal-thumb.active { border-color: var(--color-gold); }
.force-badge {
  font-size: 0.58rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  gap: 6px;
}
.force-badge[data-side="dark"] {
  border-color: var(--color-dark-border);
  color: var(--color-dark);
  background: var(--color-dark-soft);
}
.force-badge[data-side="light"] {
  border-color: var(--color-light-border);
  color: var(--color-light);
  background: var(--color-light-soft);
}
.modal-nav {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-text-muted);
}
.modal-content { padding: 40px 36px; }
.modal-set-num {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--color-gold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.modal-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.modal-rule {
  height: 1px;
  background: var(--color-gold);
  margin-bottom: 24px;
  width: 80px;
}
.modal-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--color-mist);
  margin-bottom: 24px;
}
.spec-cell {
  padding: 10px 14px;
  border-right: 1px solid var(--color-mist);
  border-bottom: 1px solid var(--color-mist);
}
.spec-label {
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 3px;
}
.spec-value {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-primary);
}
.modal-description {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 28px;
  border-left: 2px solid var(--color-gold-border);
  padding-left: 14px;
}
.modal-cta {
  display: flex;
  gap: 10px;
}
.btn-primary {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 10px 20px;
  border: 1px solid var(--color-gold);
  background: none;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-gold-dim);
}
.btn-secondary {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 10px 20px;
  border: 1px dashed var(--color-mist);
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--color-text-secondary);
  color: var(--color-text-primary);
}
```

---

## ✨ Animations & Effets v3

### Tokens d'animation

```css
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);      /* Expo out — entrées fluides */
--ease-in:    cubic-bezier(0.7, 0, 0.84, 0);       /* Expo in — sorties */
--ease-hover: cubic-bezier(0.4, 0, 0.2, 1);        /* Material — hover cards */
--duration-fast:   150ms;   /* Micro-interactions */
--duration-normal: 250ms;   /* Transitions standard */
--duration-slow:   350ms;   /* Entrées modales */
```

### Animations définies

```css
/* Modal entrée */
@keyframes modalEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Image casque flottante */
@keyframes floatSlow {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* Shimmer rule dorée */
@keyframes ruleShimmer {
  0%   { opacity: 0.4; }
  50%  { opacity: 1; }
  100% { opacity: 0.4; }
}

/* Apparition hero (stagger) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* .hero-title { animation: fadeUp 0.7s var(--ease-out) 0.1s both; } */
/* .hero-subtitle { animation: fadeUp 0.7s var(--ease-out) 0.25s both; } */
/* .hero-stats { animation: fadeUp 0.7s var(--ease-out) 0.4s both; } */
```

### Préférence reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📐 Responsive Design v3

### Grille Casques

| Breakpoint | Colonnes | Gap |
|-----------|----------|-----|
| Mobile (< 480px) | 2 | 12px |
| Tablet (480-768px) | 3 | 16px |
| Laptop (768-1024px) | 4 | 20px |
| Desktop (1024-1280px) | 5 | 24px |
| Wide (1280px+) | 6 | 28px |

### Modal Responsive

```css
@media (max-width: 768px) {
  .helmet-modal { grid-template-columns: 1fr; }
  .modal-visual { min-height: 260px; border-right: none; border-bottom: 1px solid var(--color-mist); }
}
@media (max-width: 480px) {
  .helmet-modal { width: 100%; border-radius: 16px 16px 0 0; margin-top: auto; }
  .modal-backdrop { align-items: flex-end; }
}
```

---

## 🖼️ Maquettes Stitch Générées

> ✅ Maquettes générées via Stitch MCP (Gemini 3 Pro) — Projet ID: `7556511782102256471`

### Écran 1 — Galerie principale (Hero + Filtres + Grille)
- **Fichier :** `.stitch/designs/v3/gallery-main.html`
- **Screen ID :** `e49cc8aed0394529b94affa9b115f21b`
- **Dimensions :** 2560 × 4086px
- **Contenu :** Navigation serif/gold, hero blanc centré avec stats monospace, filtres pills uppercase avec gold underline actif, grille 5 colonnes cards blanches avec ombres légères

### Écran 2 — Résultats filtrés / Search active
- **Fichier :** `.stitch/designs/v3/gallery-filtered.html`
- **Screen ID :** `b7cf9f511e32472cab68458d9be4c8f0`
- **Dimensions :** 2560 × 2480px
- **Contenu :** Filtres actifs (gold underline + border), active filter chips supprimables, 3 résultats centrés sur fond blanc, espace vide expressif autour des résultats

### Écran 3 — Modal détail casque (Darth Vader)
- **Fichier :** `.stitch/designs/v3/helmet-modal.html`
- **Screen ID :** `bd2fd0733fbc40f0ac470cf1527ca452`
- **Dimensions :** 2560 × 2048px
- **Contenu :** Modal 2 colonnes sur backdrop ivory flou, image Darth Vader, thumbnails, force badge bordeaux, specs grid en tableau, description italique prose, CTA outlined gold

---

## 🚀 Checklist d'Implémentation v3

### Phase 1 — Setup typographie & variables CSS
- [ ] Import Google Fonts (Playfair Display + Inter + JetBrains Mono)
- [ ] Définir tous les tokens CSS v3 (couleurs, typo, transitions)
- [ ] Supprimer les variables v2 (--color-void, --color-nebula, etc.)

### Phase 2 — Structure HTML & navbar
- [ ] Navbar blanche minimale avec brand serif et gold border-bottom
- [ ] Nav links uppercase tracked
- [ ] Sticky behaviour avec z-index propre

### Phase 3 — Hero section
- [ ] Titre Playfair Display léger (300)
- [ ] Subtitle uppercase tracé
- [ ] Gold rule horizontale 120px centrée
- [ ] Stats row monospace (4 valeurs)
- [ ] Animations fadeUp stagger au load

### Phase 4 — Filter bar sticky
- [ ] Pills type `button` avec gold underline actif (pas de background)
- [ ] Force side toggle minimal outlined
- [ ] Search input bottom-border-only style
- [ ] Sort select (minimal, flèche custom)
- [ ] Active filter chips avec close button
- [ ] "Clear all" link discret

### Phase 5 — Count bar
- [ ] Texte résultat "X of 24" petit, muted
- [ ] Toggle grille/liste (icônes lignes/grid)

### Phase 6 — Cards v3
- [ ] Fond blanc, border smoke → gold au hover
- [ ] Image centrée, fond blanc pur, aspect-ratio 1:1
- [ ] Image scale + drop-shadow lift au hover
- [ ] Nom small-caps, set# monospace gold
- [ ] Bouton favoris discret (visible au hover seulement)

### Phase 7 — Modal v3 (priorité haute)
- [ ] Backdrop ivory + `backdrop-filter: blur(8px)`
- [ ] Grid 2 colonnes (360px + 1fr)
- [ ] Colonne visuelle : image float, thumbnails, force badge, nav prev/next
- [ ] Colonne content : set#, titre serif, gold rule, specs grid, description italic, CTA outlined
- [ ] Animation entrée `modalEnter`
- [ ] Fermeture : ✕, Escape, clic backdrop
- [ ] Responsive : stack vertical ≤768px, bottom sheet ≤480px

### Phase 8 — JS update
- [ ] `openModal(id)` / `closeModal()` avec focus trap
- [ ] `navigateModal(dir)` — prev/next dans la liste filtrée courante
- [ ] Keyboard: Escape (close), ArrowLeft/Right (navigate)
- [ ] `computeFilterCounts()` — compter les résultats par filtre
- [ ] `renderActiveFilterTags()` — afficher les chips actifs
- [ ] `sortHelmets(by)` — tri nom/année/série
- [ ] `toggleView(mode)` — grille/liste

### Phase 9 — Polish accessibilité
- [ ] `role="dialog"` + `aria-modal="true"` + `aria-labelledby` sur modal
- [ ] Focus trap dans modal
- [ ] `aria-label` sur tous les boutons icon
- [ ] Focus visible : outline 2px gold offset 2px
- [ ] `loading="lazy"` sur images
- [ ] Skip to content link

---

## 📊 Comparatif v2 → v3

| Dimension | v2 | v3 | Gain |
|-----------|----|----|------|
| **Fond principal** | Espace noir `#060810` | Blanc muséal `#FFFFFF` | Rupture totale, mémorable |
| **Direction** | Cinéma SF sombre | Art gallery luxe | Unique, inattendu |
| **Typographie titre** | Orbitron (SF) | Playfair Display (serif) | Noblesse, intemporel |
| **Accent principal** | Bleu force `#4fc3f7` | Or chaud `#C9A84C` | Plus premium, moins générique |
| **Fond cards** | Glassmorphism dark | Blanc pur, ombre légère | Les casques ressortent mieux |
| **Filtres** | Pills colorées avec background | Texte uppercase + gold underline | Plus sobre, plus éditorial |
| **Hover cards** | Glow néon coloré | Border gold + image lift | Élégance vs tape-à-l'œil |
| **Modal visual** | Colonne dark avec nébuleuse | Fond ivory pur + blur | Artwork first |
| **Description casque** | Spec grid technique | Prose italic serif + specs | Catalogue d'art vs fiche produit |
| **Animations** | Particules, étoiles, shimmer | Float doux, fade-up, modal enter | Subtilité vs spectacle |
| **Côté Force** | Rouge/bleu criards | Bordeaux/bleu acier sobres | Nuance vs saturation |
| **Feel global** | Star Wars immersive | Collector's exhibition | Maturité, prestige |
