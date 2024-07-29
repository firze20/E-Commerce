# Backend Project - E-Commerce

This is the backend project for the E-Commerce application. It utilizes Sequelize as the ORM (Object-Relational Mapping) tool for database management.

## Configuration

1. Create a `.env` file in the project root directory.
2. Set the following environment variables in the `.env` file:
    - `DB_HOST`: The host address of your database server.
    - `DB_PORT`: The port number of your database server.
    - `DB_NAME`: The name of the database.
    - `DB_USER`: The username for accessing the database.
    - `DB_PASSWORD`: The password for accessing the database.

## Usage

To start the backend server, run the command `npm run dev` or `yarn dev` . This will launch the server and establish a connection to the database.

# Project Structure

```
├── app (main folder)
│   ├── __tests__
│   │   ├── app
│   │   └── routes
│   ├── app.ts
│   ├── config
│   │   ├── auth
│   │   ├── cache
│   │   ├── context
│   │   └── db
│   ├── controllers
│   │   ├── admin
│   │   ├── auth
│   │   ├── manager
│   │   └── shop
│   ├── database
│   │   ├── db.config.ts
│   │   └── models
│   ├── global
│   │   ├── globalSetup.ts
│   │   ├── globalTeardown.ts
│   │   └── jest.setup.ts
│   ├── helpers
│   │   └── format.ts
│   ├── middlewares
│   │   ├── auth
│   │   ├── index.ts
│   │   └── passport
│   ├── routes
│   │   ├── admin
│   │   ├── auth
│   │   ├── index.ts
│   │   ├── main.routes.ts
│   │   ├── manager
│   │   ├── shop
│   │   └── unknown
│   ├── start
│   │   ├── data
│   │   └── dbInitDevTest
│   ├── types
│   │   ├── express.d.ts
│   │   └── global.d.ts
│   └── utils
│       ├── connect.ts
│       ├── jwt.ts
│       ├── logger.ts
│       ├── redis.ts
│       ├── server.ts
│       └── swagger.ts
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   └── sorter.js
│   └── lcov.info
├── jest.config.ts
├── package.json
└── tsconfig.json
```
