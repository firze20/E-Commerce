# Use the official Node.js image.
FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

# Install necessary development tools
RUN apk add --no-cache bash vim git

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
COPY frontend/e-commerce/package*.json ./

# Install dependencies.
RUN pnpm install

# Copy local code to the container image.
COPY frontend/e-commerce ./

# Change ownership of the app directory to the node user
RUN chown -R node:node /usr/app

# Switch to the node user
USER node

# Run the web service on container startup.
CMD ["pnpm", "run", "dev"]