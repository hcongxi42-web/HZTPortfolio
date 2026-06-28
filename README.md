# HZT Portfolio — A-Share Factor Model Research

Academic portfolio website showcasing Conditional Autoencoder (CA) asset pricing model research in China's A-share market.

**Live Site:** [hcongxi42-web.github.io/HZTPortfolio](https://hcongxi42-web.github.io/HZTPortfolio)

## About

- Systematically compares FF, PCA, IPCA, and CA models (0–3 hidden layers) on A-share stocks
- CA(1-layer) achieves **+312.1%** 5-year cumulative return (CSI 300: +24.2%)
- 87 firm characteristics across 10 economic categories
- Interactive Plotly charts + static PNG fallback
- Bilingual (EN/中文)

## Tech Stack

- Pure HTML/CSS/JS (no framework)
- Plotly.js for interactive charts
- KaTeX for math rendering
- GitHub Pages for deployment

## Structure

```
├── index.html          # Home: Hero + results + Plotly charts
├── methodology.html    # Factor classification + descriptive stats
├── css/academic.css    # Academic journal style
├── js/
│   ├── i18n.js         # EN/中文 toggle
│   ├── plots.js        # Plotly chart generation
│   └── main.js         # UI logic
├── data/               # JSON data files
└── images/             # Static chart PNGs
```
