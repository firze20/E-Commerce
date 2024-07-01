FROM node:lts-alpine

WORKDIR /usr/app

# Copy package.json and package-lock.json from the backend directory
COPY backend/package*.json ./

RUN npm install

# Copy all files from the backend directory to the working directory
COPY backend/ ./

EXPOSE 3000

CMD ["npm", "start"]