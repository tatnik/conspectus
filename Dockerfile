# syntax=docker/dockerfile:1
##ARG NODE_VERSION=20.5.0
FROM node:18-alpine AS builder
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
RUN chown node:node ./
USER node
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --silent && npm cache clean --force
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
