# Plateforme Web 3D — Mosquée El Mechouar, Tlemcen

[![DOI](https://zenodo.org/badge/1272356641.svg)](https://doi.org/10.5281/zenodo.20744149)

Plateforme de documentation et de valorisation numérique du patrimoine architectural de la Mosquée El Mechouar (Tlemcen, Algérie), développée par le **Centre des Techniques Spatiales (CTS) — Département Études et Gestion de Projets**.

## Fonctionnalités

| Module | Description |
|--------|-------------|
| **Accueil** | Page hero avec section contact et localisation CTS |
| **Galerie** | 19 panoramas haute résolution issus de la visite virtuelle, filtrables par catégorie |
| **Scène 360°** | Visite virtuelle interactive embarquée |
| **Nuage de Points** | Lecteur vidéo des acquisitions FARO Focus S350 |

## Stack technique

- **React 19** + TypeScript
- **Vite 6** — bundler et serveur de développement
- **Tailwind CSS 4** — styles utilitaires
- **Three.js** — rendu 3D (prêt pour intégration de nuages de points)
- **Lucide React** — iconographie

## Données laser (FARO Focus S350)

- Portée utile : 350 m
- Taux d'acquisition : 976 000 pts/s
- Précision : ± 1 mm

## Installation

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

## Structure du projet

```
mechouar_3d/
├── src/
│   ├── App.tsx              # Composant principal
│   ├── data/
│   │   └── gallery.json     # Données de la galerie (modifiable)
│   └── assets/images/       # Images statiques
├── image/                   # Logos CTS et ASAL
├── visite virtuel/          # Visite virtuelle 360° embarquée
└── Video/                   # Vidéos FARO (non versionnées — voir .gitignore)
```

## Personnalisation

Pour adapter la galerie à un autre site patrimonial, modifier uniquement `src/data/gallery.json`.

## Institution

**Centre des Techniques Spatiales (CTS)**  
10, Avenue de la Palestine, Cité des Jardins, BP 13, 31004 Arzew, Wilaya d'Oran, Algérie  
Agence Spatiale Algérienne (ASAL)
