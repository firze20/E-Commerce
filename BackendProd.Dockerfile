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
COPY backend/package*.json ./

# Install dependencies
RUN yarn install --production

# Copy local code to the container image
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup
CMD ["yarn", "start"]