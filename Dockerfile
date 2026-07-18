# 1. Utiliser une image Node.js officielle et légère
FROM node:20-alpine

# 2. Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers de configuration des packages
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du code source
COPY . .

# 6. Exposer le port de dev (5173 pour Vite, ou 3000 pour Create React App)
EXPOSE 5173

# 7. Lancer le serveur de développement
CMD ["npm", "run", "dev"]