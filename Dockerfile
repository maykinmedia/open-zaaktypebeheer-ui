ARG NGINX_VERSION=1.21

# Stage 1 -- install dev tools and build bundle
FROM node:18-bullseye-slim AS build

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  git \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ARG UI_VERSION=latest

COPY package-lock.json package.json ./
COPY .env.production.template ./.env.production
COPY ./scripts/replace-envvars.sh ./replace-envvars.sh

# TODO: Fix once issue 24 is fixed
RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build

# Stage 2 -- serve static build with nginx
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}

WORKDIR /ui

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ .
COPY --from=build /app/.env.production .
COPY --from=build /app/replace-envvars.sh /docker-entrypoint.d/replace-envvars.sh

USER root
RUN chown 101:101 -R ./
RUN chmod +x /docker-entrypoint.d/replace-envvars.sh
USER nginx

EXPOSE 5173