# Use an official Node.js runtime as a parent image
FROM cypress/included:latest

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

# Set the working directory
WORKDIR /usr/app 

# Copy package.json and yarn.lock to the working directory
COPY frontend/e-commerce/package*.json ./

# Install any needed packages specified in package.json
RUN yarn install

# Install start-server-and-test globally
RUN yarn global add start-server-and-test

# Copy the rest of your application's code
COPY frontend/ ./


# Run the Cypress tests
CMD ["yarn", "test:e2e"]