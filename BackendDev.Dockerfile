# Use the official Node.js image.
FROM node:lts-alpine

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY backend/ ./

# Set correct ownership of the app directory
RUN chown -R node:node /usr/app

# Switch to the node user
USER node

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "dev"]