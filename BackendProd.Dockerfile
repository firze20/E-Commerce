FROM node:lts-alpine

WORKDIR /usr/app/backend

COPY backend/package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build