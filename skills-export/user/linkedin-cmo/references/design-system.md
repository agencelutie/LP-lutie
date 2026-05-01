# Design System - Rapports CMO LinkedIn

Ce fichier contient le design system complet a appliquer a tous les rapports HTML generes par le skill. Lis ce fichier avant de generer tout rapport HTML et applique exactement ce systeme de design.

## Philosophie

Le design doit evoquer un cabinet de conseil haut de gamme : minimaliste, sophistique, premium. Pas de gradients criards, pas de bordures colorees epaisses, pas d'ombres prononcees. L'espace blanc est un outil de design a part entiere. Chaque element doit respirer.

## Palette de couleurs

```css
:root {
  /* Couleurs principales */
  --noir: #1a1a1a;
  --noir-profond: #0d0d0d;
  --marron-fonce: #2c1810;
  --marron: #3d2519;

  /* Accents violet tres fonce */
  --violet-profond: #1e1033;
  --violet-sombre: #2a1745;

  /* Accents ambre / dore */
  --ambre: #c4841d;
  --ambre-fonce: #a06b15;
  --ambre-clair: #d4a04a;
  --dore: #b8942e;

  /* Indicateurs de performance */
  --vert-positif: #2d8a4e;
  --vert-clair-bg: #eaf5ee;
  --rouge-negatif: #c0392b;
  --rouge-clair-bg: #fbeaea;

  /* Neutres */
  --gris-100: #f7f6f4;
  --gris-200: #eceae6;
  --gris-300: #d4d0ca;
  --gris-400: #a39e96;
  --gris-500: #6b6560;
  --gris-600: #4a4541;
  --blanc: #fefdfb;
}
```

## Typographie

Les polices sont chargees via Google Fonts (une seule balise link). Lora pour les titres, Inter pour le corps.

```html
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
/* Titres - Lora (serif premium) */
h1, h2, h3, h4 {
  font-family: 'Lora', Georgia, 'Times New Roman', serif;
  color: var(--noir-profond);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem; }
h2 { font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--gris-200); }
h3 { font-size: 1.15rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }

/* Corps - Inter (sans-serif moderne) */
body, p, td, th, li, span, div {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--noir);
  font-weight: 400;
  line-height: 1.7;
  font-size: 0.935rem;
}
```

## Structure de page

```css
body {
  background: var(--gris-100);
  margin: 0;
  padding: 2rem 1rem;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  background: var(--blanc);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  overflow: hidden;
}
```

## En-tete du rapport

L'en-tete utilise un fond noir/marron fonce. Le titre est en blanc, le sous-titre en ambre. Tres sobre, pas de gradient.

```css
.header {
  background: var(--marron-fonce);
  color: var(--blanc);
  padding: 3rem 3rem 2.5rem;
}

.header h1 {
  color: var(--blanc);
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.header .subtitle {
  color: var(--ambre-clair);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.header .meta {
  color: var(--gris-300);
  font-size: 0.8rem;
  margin-top: 1rem;
  font-family: 'Inter', sans-serif;
}
```

## Corps du rapport

```css
.content {
  padding: 2.5rem 3rem 3rem;
}

p {
  margin-bottom: 1rem;
  color: var(--gris-600);
}
```

## Tableaux

Les tableaux sont minimalistes : pas de bordures epaisses, juste des lignes fines horizontales. L'en-tete est en marron fonce.

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}

thead th {
  background: var(--marron-fonce);
  color: var(--blanc);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
}

tbody td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gris-200);
  color: var(--gris-600);
  vertical-align: top;
}

tbody tr:hover {
  background: var(--gris-100);
}

tbody tr:last-child td {
  border-bottom: none;
}
```

## Cartes et blocs d'analyse

Pour les fiches par post ou par concurrent, utiliser des cartes sobre avec bordure fine.

```css
.card {
  border: 1px solid var(--gris-200);
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1rem 0;
  background: var(--blanc);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--gris-200);
}

.card h3 {
  margin: 0;
  font-size: 1.05rem;
}
```

## Indicateurs de performance (vert/rouge)

Pour mettre en valeur les elements positifs et negatifs.

```css
.badge-positive {
  display: inline-block;
  background: var(--vert-clair-bg);
  color: var(--vert-positif);
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
}

.badge-negative {
  display: inline-block;
  background: var(--rouge-clair-bg);
  color: var(--rouge-negatif);
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
}

.score-high { color: var(--vert-positif); font-weight: 600; }
.score-low { color: var(--rouge-negatif); font-weight: 600; }
.score-neutral { color: var(--ambre-fonce); font-weight: 600; }
```

## Section de score (note sur 10)

```css
.score-display {
  text-align: center;
  padding: 2rem;
  margin: 1.5rem 0;
  background: var(--gris-100);
  border-radius: 4px;
}

.score-display .number {
  font-family: 'Lora', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--noir-profond);
  line-height: 1;
}

.score-display .label {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--gris-400);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
}
```

## Barres de progression

Pour les ratios et metriques visuelles.

```css
.progress-bar {
  background: var(--gris-200);
  border-radius: 2px;
  height: 6px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-bar .fill {
  height: 100%;
  border-radius: 2px;
  background: var(--ambre);
  transition: width 0.3s ease;
}

.progress-bar .fill.high { background: var(--vert-positif); }
.progress-bar .fill.low { background: var(--rouge-negatif); }
```

## Blocs de citation / accroches

Pour afficher les accroches de posts analysees.

```css
blockquote, .hook-quote {
  border-left: 3px solid var(--ambre);
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  background: var(--gris-100);
  font-style: italic;
  color: var(--gris-500);
  font-size: 0.9rem;
}
```

## Recommandations numerotees

```css
.recommendation {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gris-200);
}

.recommendation:last-child { border-bottom: none; }

.recommendation .number {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background: var(--violet-profond);
  color: var(--blanc);
  font-family: 'Lora', serif;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.recommendation .text {
  flex: 1;
}

.recommendation .text strong {
  color: var(--noir);
}
```

## Section ambre (highlights importants)

```css
.highlight-box {
  background: linear-gradient(135deg, var(--marron-fonce) 0%, var(--violet-profond) 100%);
  color: var(--blanc);
  padding: 1.5rem 2rem;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.highlight-box h3 {
  color: var(--ambre-clair);
  font-family: 'Lora', serif;
  margin-top: 0;
}

.highlight-box p, .highlight-box li {
  color: var(--gris-200);
}
```

## Pied de page

```css
.footer {
  text-align: center;
  padding: 2rem 3rem;
  border-top: 1px solid var(--gris-200);
  font-size: 0.75rem;
  color: var(--gris-400);
}
```

## Responsive

```css
@media (max-width: 768px) {
  .header, .content { padding-left: 1.5rem; padding-right: 1.5rem; }
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.25rem; }
  table { font-size: 0.8rem; }
  .card { padding: 1rem; }
}
```

## A ne pas faire

- Pas de gradients multicolores criards
- Pas d'ombres prononcees (box-shadow max 3px blur)
- Pas de bordures epaisses ou colorees
- Pas de fond bleu, pas de fond gris fonce sur le corps du rapport
- Pas de police decorative ou fantaisie
- Pas d'emojis dans les titres ou le corps
- Pas de coins tres arrondis (max 4px de border-radius sauf badges)
- Pas d'animations ou de transitions visibles

## Structure type d'un rapport

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TITRE DU RAPPORT]</title>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    /* Coller ici TOUTES les regles CSS ci-dessus */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>[Titre principal]</h1>
      <div class="subtitle">[Type d'analyse]</div>
      <div class="meta">[Date] | [Profil/Niche concerne]</div>
    </div>
    <div class="content">
      <!-- Contenu structure avec h2, h3, tables, cards, etc. -->
    </div>
    <div class="footer">
      Rapport genere par CMO LinkedIn | Skill par ZenithIA &amp; Enzo Donati | [Date]
    </div>
  </div>
</body>
</html>
```
