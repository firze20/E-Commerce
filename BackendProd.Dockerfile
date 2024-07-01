FROM node:lts-alpine

WORKDIR /usr/app

COPY backend/package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build