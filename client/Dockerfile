ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine AS base

ARG PORT=5174

ARG NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# === Development stage ===
FROM base AS dev

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

# === Build stage for production ===
FROM base AS build

RUN npm run build

# === Production serve stage ===
FROM nginx:alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
