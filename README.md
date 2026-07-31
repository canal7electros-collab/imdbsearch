# FILM CROISÉ - PWA IMDb

Une Progressive Web App pour trouver les films en commun entre deux personnes du cinéma (acteurs, réalisateurs, producteurs, etc.).

## 🎬 Fonctionnalités

- Recherche de personnes sur IMDb
- Comparaison de filmographies
- Affichage des films en commun
- PWA installable sur l'écran d'accueil
- Design dark élégant
- API Apify (données officielles IMDb)

## 🚀 Déploiement sur Netlify

### Prérequis

- Un compte **Netlify** (gratuit)
- Un compte **Apify** avec une API Key
- Accès à GitHub (ou fichiers locaux)

### Étapes

#### 1. Préparation du dépôt GitHub

```bash
# Créer un nouveau repo sur GitHub
# Cloner ou créer un dossier local avec les fichiers:
# - film-croise.html
# - netlify.toml
# - netlify/functions/search-imdb.js
# - README.md

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_COMPTE/film-croise.git
git push -u origin main
```

#### 2. Configuration Netlify

1. Va sur **https://app.netlify.com/**
2. Clique sur **"Add new site"** → **"Import an existing project"**
3. Sélectionne **GitHub** et autorise Netlify
4. Choisis ton repo `film-croise`
5. Clique sur **"Deploy site"**

#### 3. Ajouter la variable d'environnement

1. Dans Netlify, va dans **Settings** → **Environment variables**
2. Clique sur **"Add a variable"**
3. Crée deux variables :
   - **Key:** `APIFY_API_KEY`
   - **Value:** `apify_api_EeKDiXe5OOvQGpsSav7DZOr4ByRQT93wgpjk`

4. Redéploie le site en allant dans **Deploys** → **Trigger deploy**

#### 4. C'est fait! 🎉

Ton site est maintenant accessible à :
```
https://ton-site.netlify.app
```

## 📁 Structure des fichiers

```
film-croise/
├── film-croise.html              # PWA principale (tout-en-un)
├── netlify.toml                  # Configuration Netlify
├── netlify/
│   └── functions/
│       └── search-imdb.js        # Backend pour l'API Apify
└── README.md                     # Ce fichier
```

## 🛠️ Développement local

### Avec Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Lancer localement (port 8888)
netlify dev

# Ouvrir http://localhost:8888
```

### Sans Netlify CLI

1. Ouvre simplement `film-croise.html` dans un navigateur
2. La recherche ne fonctionnera que si le backend répond

## 🔒 Sécurité

- **La clé API Apify est cachée côté backend** (variable d'environnement Netlify)
- **Elle ne s'expose jamais au navigateur**
- Les requêtes passent par Netlify Functions

## 📊 Limitation d'usage

- **Gratuit Apify:** ~100 requêtes/mois
- Cette PWA est optimisée pour du **petit usage personnel/professionnel**
- Pour plus de requêtes, upgrade Apify ou cache les résultats

## 🎯 Cas d'usage

- Équipes de tournage : retrouver les collaborations entre crew
- Producteurs : analyser les collaborations d'acteurs
- Chercheurs : étudier les filmographies
- Cinéphiles : curiosité!

## ⚖️ Légal

- Données extraites d'IMDb (publiques)
- Utilisation personnelle/non-commerciale
- Conformément à la licence IMDb

---

**Besoin d'aide?** Vérifie les logs Netlify dans **Functions** → **Logs** si ça bug.
