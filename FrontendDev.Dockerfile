    # Use the official Node.js image.
    FROM node:20.10.0-alpine

    # Install yarn
    RUN apk add --no-cache bash curl && curl -o- -L https://yarnpkg.com/install.sh | bash
    ENV PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

    # # Install necessary development tools
    # RUN apk add --no-cache bash vim git

    # Create and change to the app directory.
    WORKDIR /usr/app

    # Copy application dependency manifests to the container image.
    COPY frontend/e-commerce/package*.json ./

    # Install dependencies.
    RUN yarn install

    # Copy local code to the container image.
    COPY frontend/e-commerce/ ./

    # Set correct ownership of the app directory
    RUN chown -R node:node /usr/app

    # Switch to the node user
    USER node

    # Expose the port the app runs on
    EXPOSE 3001

    # Run the web service on container startup.
    CMD ["yarn", "dev"]