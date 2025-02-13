ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine AS base

ARG PORT=3333

ARG NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

# === Development stage ===
FROM base AS dev

ARG NODE_ENV=development

CMD ["npm", "run", "start:dev"]


# === Production stage ===
FROM base AS prod

RUN npm run build

ARG NODE_ENV=production

CMD ["npm", "run", "start:prod"]