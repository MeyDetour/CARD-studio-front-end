# ==========================================
# ÉTAPE COMMUNE : Installation de base
# ==========================================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ==========================================
# CIBLE 1 : Environnement de DEV local
# ==========================================
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ==========================================
# CIBLE 2 : Compilation pour la PROD
# ==========================================
FROM base AS builder
RUN npm run build

# ==========================================
# CIBLE 3 : Serveur de PROD Apache final
# ==========================================
FROM httpd:alpine AS prod
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
EXPOSE 80