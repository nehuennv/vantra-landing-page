# Etapa 1: Construcción (Builder)
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json package-lock.json ./

# 🔥 SOLUCIÓN NUCLEAR PARA REACT 19
# Creamos un archivo de configuración forzoso que desactiva el chequeo estricto
RUN echo "legacy-peer-deps=true" > .npmrc

# Ahora ejecutamos install (leerá la configuración de arriba automáticamente)
RUN npm install

# Copiamos el resto del código
COPY . .

# Recepción de argumentos de build
ARG VITE_API_URL
ARG VITE_API_TOKEN

# Exponerlos como variables de entorno para Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN

# Construimos la app
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Copiamos la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos generados en la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]