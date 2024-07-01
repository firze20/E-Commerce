FROM node:lts-alpine

WORKDIR /usr/app

COPY ./backend/package.json ./backend

RUN npm install

COPY . .

EXPOSE 3000

RUN npm start

