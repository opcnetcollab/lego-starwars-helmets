# 🪖 Lego Star Wars Helmets

Site statique — collection officielle des casques Lego Star Wars.

## Lancer en local

```bash
npx serve -l 3000 .
# → http://localhost:3000
```

## Déployer avec Docker

```bash
# Build
docker build -t casqu-site .

# Run (container isolé, port 3000)
docker run -d --name casqu-site -p 3000:3000 casqu-site

# → http://localhost:3000
```

## Stack

- HTML/CSS/JS vanilla — aucune dépendance front
- Données : `data/helmets.json`
- Serveur : `serve` (Node.js, statique)
