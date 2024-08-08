# Use the official Node.js image
FROM node:20.10.0-alpine

# Install yarn
RUN apk add --no-cache bash curl && curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

# Set environment to production
ENV NODE_ENV=production

# Create and change to the app directory
WORKDIR /usr/app

# Copy application dependency manifests to the container image
COPY frontend/e-commerce/package*.json ./

# Install dependencies
RUN yarn install --production

# Copy local code to the container image
COPY frontend/e-commerce/ ./

# Build the React app
RUN yarn build

# This stage only builds the frontend and does not run a server