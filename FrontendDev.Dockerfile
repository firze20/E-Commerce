# Use the official Node.js image.
FROM node:lts-alpine

# Install necessary development tools
RUN apk add --no-cache bash vim git

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD ["npm", "run", "dev"]