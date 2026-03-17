# DESIGN.md — Lego Star Wars Helmets
> Design System v1.0 — Refonte cinématique 2024

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
--color-light-glow:     #29b6f6;  /* Glow lumineux */
--color-light-soft:     rgba(79, 195, 247, 0.15); /* Glassmorphism clair */

/* 🔴 Côté Obscur (The Acolyte / Sith) */
--color-dark-primary:   #e53935;  /* Rouge Sith */
--color-dark-purple:    #7b1fa2;  /* Violet Force noire */
--color-dark-glow:      #d32f2f;  /* Glow obscur */
--color-dark-soft:      rgba(229, 57, 53, 0.15);  /* Glassmorphism sombre */

/* Chrome Mandalorian */
--color-chrome-light:   #b0bec5;  /* Beskar clair */
--color-chrome-mid:     #78909c;  /* Beskar medium */
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
| Hero Title | Orbitron | `clamp(2.5rem, 6vw, 5rem)` | 800 | `0.05em` |
| Hero Subtitle | Inter | `clamp(1rem, 2.5vw, 1.25rem)` | 400 | `0.1em` |
| Section Header | Orbitron | `1.5rem` | 700 | `0.08em` |
| Card Title | Orbitron | `0.9rem` | 600 | `0.05em` |
| Card Meta | Inter | `0.75rem` | 400 | `0.02em` |
| Filter Label | Inter | `0.7rem` | 600 | `0.12em` uppercase |
| Footer | Inter | `0.8rem` | 400 | `0.03em` |

---

## 🏗️ Composants Détaillés

### 1. Hero Section

**Layout :** Plein écran (`100vh`), centré verticalement. Fond : animation de fond étoilé + nébuleuse dégradée.

```
┌─────────────────────────────────────────────────────┐
│  [Étoiles animées en parallaxe — 3 couches]         │
│                                                     │
│           [Logo micro — étoile + texte]             │
│                                                     │
│    🪖  LEGO STAR WARS                               │
│        HELMET COLLECTION                            │
│                                                     │
│    Collection officielle · 24 casques iconiques     │
│                                                     │
│    [ ▼  Explorer la collection ]                    │
│                                                     │
│  [Nébuleuse violette-rouge bas gauche]              │
│                    [Nébuleuse bleue bas droite]     │
└─────────────────────────────────────────────────────┘
```

**Détails hero :**
- Fond : `radial-gradient` depuis `--color-void` avec 2 nébuleuses en `position: absolute`
- Nébuleuse 1 (Obscur) : `radial-gradient(ellipse, rgba(123,31,162,0.3), transparent)` — bas gauche
- Nébuleuse 2 (Lumineux) : `radial-gradient(ellipse, rgba(41,182,246,0.2), transparent)` — haut droite
- Titre : texte avec `text-shadow: 0 0 40px rgba(79,195,247,0.6)` — glow holographique
- CTA button : glassmorphism avec border chrome, hover → glow complet
- Animation d'entrée : titre fade-in + slide-up avec `animation-delay: 0.3s`
- Scroll indicator : chevron animé bounce en bas

### 2. Barre de Filtres Sticky Glassmorphism

**Comportement :** `position: sticky; top: 0; z-index: 100`  
**Effet :** `backdrop-filter: blur(20px) saturate(180%)`, background `rgba(11,15,26,0.85)`  
**Border :** `1px solid rgba(176,190,197,0.15)` — effet beskar  
**Shadow :** `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`

```
┌──────────────────────────────────────────────────────────┐
│ 🔍 [Recherche holographique]  [Tous] [Original] [Prélog] │
│                               [Mando] [Clone Wars] [+]   │
│ 💡 Lumineux  🔴 Obscur  ⭐ Tous                          │
└──────────────────────────────────────────────────────────┘
```

**Boutons de filtre :**
- Repos : `background: rgba(28,37,53,0.6)`, border `1px solid var(--color-chrome)`
- Hover : border chrome clair, `box-shadow: 0 0 12px rgba(79,195,247,0.3)`
- Actif Série : `background: var(--series-xxx)` avec opacity 0.25, border colorée
- Actif Lumineux : border + glow `--color-light-primary`
- Actif Obscur : border + glow `--color-dark-primary`
- Transition : `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

**Séparateur série/côté :** `border-right: 1px solid var(--color-chrome)` dans la barre

### 3. Barre de Recherche Holographique

**Design :** Input avec effet holographique au focus

```css
.search-input {
  background: rgba(11,15,26,0.8);
  border: 1px solid var(--color-chrome);
  border-radius: 8px;
  color: var(--color-text-primary);
  padding: 10px 16px 10px 40px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--color-light-primary);
  box-shadow: 
    0 0 0 3px rgba(79,195,247,0.15),
    0 0 20px rgba(79,195,247,0.2),
    inset 0 0 10px rgba(79,195,247,0.05);
  outline: none;
}
```

**Icône de recherche :** SVG animé au focus → rotate + color change vers `--color-light-primary`

### 4. Cards Casques

**Ratio :** `aspect-ratio: 3/4` (portrait vertical — idéal pour les casques)  
**Taille desktop :** `280px` largeur min, grille `auto-fill minmax(240px, 1fr)`

**Structure anatomique :**
```
┌─────────────────────────────┐
│  [Badge série — haut gauche] │  ← colored pill
│  [Badge côté — haut droite]  │  ← 💡 or 🔴
│                             │
│      [Image casque]         │  ← object-fit: contain
│     PNG transparent fond    │
│                             │
│─────────────────────────────│
│  Nom du casque              │  ← Orbitron 600
│  Série · Année              │  ← Inter gris
│  Set #75304                 │  ← Mono chrome
│                             │
│  [Voir détails    ▶]        │  ← CTA discret
└─────────────────────────────┘
```

**États de la card :**

```css
/* Repos */
.helmet-card {
  background: linear-gradient(135deg, var(--color-nebula), var(--color-steel));
  border: 1px solid var(--color-chrome);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.4s ease;
}

/* Hover */
.helmet-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: var(--color-chrome-light);
  box-shadow: 
    0 20px 60px rgba(0,0,0,0.6),
    0 0 30px rgba(79,195,247,0.2),  /* glow blue */
    inset 0 1px 0 rgba(176,190,197,0.2); /* top highlight */
}

/* Hover côté Obscur */
.helmet-card[data-side="dark"]:hover {
  box-shadow: 
    0 20px 60px rgba(0,0,0,0.6),
    0 0 30px rgba(229,57,53,0.2);  /* glow red */
}
```

**Overlay hover :** gradient de bas `linear-gradient(transparent 50%, rgba(6,8,16,0.9))` — permanent, intensifie au hover

**Image :** `filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5))` — donne du relief

**Badge série :**
```css
.badge-series {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(var(--series-rgb), 0.2);
  border: 1px solid rgba(var(--series-rgb), 0.4);
  color: var(--series-color);
}
```

### 5. Compteur de résultats

**Design :** Ligne discrète entre filtres et grille

```
  ▸ 24 casques  ·  Trilogie Originale  ·  Côté Obscur
```

- Typographie : Inter 0.8rem, `--color-text-muted`
- Accent actif : breadcrumb filtres avec séparateur `·`
- Animation : count change avec `countUp` JS animation

### 6. État vide

**Design :** Centré, avec illustration et message Star Wars

```
        🔭
   Aucun casque trouvé
   dans cette région de la galaxie.
   
   [ Réinitialiser les filtres ]
```

### 7. Footer

**Design :** Minimaliste, dark, avec séparateur gradient

```
────────────────────── ✦ ──────────────────────
Lego Star Wars Helmets — Collection non officielle
          May the Force be with you. 🌟
       © 2024 · Données : Bricklink · v1.0
```

- Background : `--color-void` avec top border `1px solid rgba(176,190,197,0.1)`
- Texte : `--color-text-muted`
- Séparateur top : `linear-gradient(to right, transparent, var(--color-chrome), transparent)`

---

## ✨ Animations & Effets Spéciaux

### Fond étoilé animé (3 couches)

```css
/* Couche 1 — petites étoiles rapides */
.stars-layer-1 {
  width: 1px; height: 1px;
  background: transparent;
  box-shadow: /* 200 positions random en CSS ou JS */;
  animation: starsDrift 50s linear infinite;
}

/* Couche 2 — étoiles moyennes lentes */
.stars-layer-2 {
  width: 2px; height: 2px;
  animation: starsDrift 100s linear infinite;
}

/* Couche 3 — grosses étoiles très lentes + scintillement */
.stars-layer-3 {
  width: 3px; height: 3px;
  animation: starsDrift 150s linear infinite, twinkle 3s ease-in-out infinite;
}

@keyframes starsDrift {
  from { transform: translateY(0); }
  to   { transform: translateY(-100vh); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 1; }
}
```

### Particules de Force (subtiles)

- Canvas JS overlay dans le hero
- 30 particules flottantes : côté Lumineux = bleu (0,0,0 → 79,195,247), Obscur = rouge (229,57,53)
- Mouvement : brownien lent, taille 1-3px, opacité 0.1-0.6
- Activation : au hover sur les filtres Côté de la Force

### Effet holographique sur le titre

```css
.site-title {
  background: linear-gradient(
    135deg,
    #e8eaf0 0%,
    #4fc3f7 30%,
    #e8eaf0 50%,
    #b0bec5 70%,
    #e8eaf0 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographicShimmer 4s linear infinite;
}

@keyframes holographicShimmer {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}
```

### Scanline subtle sur les cards (optionnel, au hover)

```css
.helmet-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0) 0px,
    rgba(0,0,0,0) 2px,
    rgba(255,255,255,0.02) 2px,
    rgba(255,255,255,0.02) 4px
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.helmet-card:hover::after { opacity: 1; }
```

### Transitions globales

- **Page load** : `opacity: 0 → 1` sur `.helmets-grid` avec `animation: fadeIn 0.8s ease 0.2s forwards`
- **Apparition cards** : stagger animation `animation-delay: calc(var(--i) * 0.05s)` — 24 cards × 50ms
- **Filtre apply** : cards exit `opacity: 0, scale: 0.95`, puis enter `opacity: 1, scale: 1` — 200ms total
- **Hover card** : spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` pour le bounce

---

## 📐 Responsive Design

### Breakpoints

```css
/* Mobile first */
--bp-mobile:  375px;   /* Téléphone S */
--bp-mobile-l: 430px;  /* Téléphone L (iPhone Pro Max) */
--bp-tablet:  768px;   /* Tablette portrait */
--bp-laptop:  1024px;  /* Laptop */
--bp-desktop: 1280px;  /* Desktop standard */
--bp-wide:    1536px;  /* Large écran */
```

### Grille de casques

| Breakpoint | Colonnes | Gap | Card min-width |
|-----------|----------|-----|----------------|
| Mobile (< 430px) | 2 | 12px | 160px |
| Mobile L (430-768px) | 2 | 16px | 180px |
| Tablet (768-1024px) | 3 | 20px | 220px |
| Laptop (1024-1280px) | 4 | 24px | 240px |
| Desktop (1280px+) | 5 | 28px | 240px |
| Wide (1536px+) | 6 | 32px | 260px |

```css
.helmets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: clamp(12px, 2vw, 28px);
  padding: clamp(16px, 3vw, 48px);
}
```

### Hero responsive

```css
/* Mobile : titre plus petit, padding ajusté */
@media (max-width: 768px) {
  .hero-title { font-size: clamp(2rem, 8vw, 3rem); }
  .hero-subtitle { display: none; } /* Masqué mobile */
  .hero-section { height: 60vh; } /* Réduit */
}
```

### Filtres responsive

**Mobile :** `overflow-x: auto; white-space: nowrap` — défilement horizontal  
**Tablet+** : wrap naturel sur 2 lignes si nécessaire  
**Sticky** : conservé sur tous les breakpoints

### Cards responsive

```css
/* Mobile : ratio ajusté, infos condensées */
@media (max-width: 430px) {
  .card-body { padding: 10px 12px; }
  .card-title { font-size: 0.75rem; }
  .card-meta { display: none; } /* Masqué sur très petit écran */
  .badge { font-size: 0.6rem; }
}
```

---

## 🖼️ Maquettes Stitch Générées

Les maquettes haute-fidélité ont été générées via le MCP Stitch :

### Écran 1 — Page principale (Hero + Filtres + Grille)
- **Fichier HTML :** `.stitch/designs/lego-sw-helmets-main.html`
- **Screenshot :** `.stitch/designs/lego-sw-helmets-main.png`

### Écran 2 — État hover d'une card casque
- **Fichier HTML :** `.stitch/designs/lego-sw-helmets-card-hover.html`
- **Screenshot :** `.stitch/designs/lego-sw-helmets-card-hover.png`

> Les URLs/IDs Stitch sont mis à jour après génération.

---

## 🚀 Checklist d'Implémentation

### Phase 1 — Fondations CSS
- [ ] Variables CSS (tokens palette, typo, spacing)
- [ ] Reset + base styles
- [ ] Fond étoilé animé (3 couches)
- [ ] Nébuleuses positionnées

### Phase 2 — Composants
- [ ] Hero section avec animations d'entrée
- [ ] Filtres glassmorphism sticky
- [ ] Cards avec tous les états
- [ ] Recherche holographique
- [ ] Badges série et côté

### Phase 3 — Interactivité
- [ ] Filtrage JS (série + côté + recherche combinés)
- [ ] Animations de transition filtre
- [ ] Stagger animation cartes
- [ ] Particules Force (canvas)
- [ ] Compteur animé

### Phase 4 — Polish
- [ ] Responsive mobile/tablet
- [ ] Accessibilité (aria-labels, focus visible, reduced-motion)
- [ ] Performance (lazy loading images, will-change CSS)
- [ ] Dark mode natif (déjà dark by default)
