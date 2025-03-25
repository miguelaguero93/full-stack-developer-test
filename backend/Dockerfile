# backend/Dockerfile

FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package files y deps
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Construir el proyecto
RUN npm run build

# Exponer puerto de la app Nest (por default 3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start:prod"]
