# syntax=docker/dockerfile:1
##ARG NODE_VERSION=20.5.0
FROM node:18-alpine AS builder
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/app


COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm --version

RUN chown node:node ./
USER node
RUN pnpm install

COPY . .

RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
