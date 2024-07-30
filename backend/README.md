# Backend Project - E-Commerce

This is the backend project for the E-Commerce application. It utilizes Sequelize as the ORM (Object-Relational Mapping) tool for database management.

## Configuration

1. Create a `.env` file in the project root directory.
2. Set the following environment variables in the `.env` file:
    - `NODE_ENV`: the enviroment (development, testing, production)
    - `PORT`: the port you want the server to run e.g (3000)
    - `DB_HOST`: The host address of your database server.
    - `DB_NAME`: The name of the database.
    - `DB_TEST`: The database name for test.
    - `DB_PASSWORD`: The database password.
    - `DB_USER`: The username for accessing the database.
    - `DB_DRIVER`: The database driver.
    - `JWT_SECRET`: The jwt secret.
    - `REFRESH_SECRET`: The refresh token secret.
    - `JWT_EXPIRATION`: The JWT Expiration in ms.
    - `JWT_REFRESH_EXPIRATION`: The refresh token expiration in ms/
    - `SUPER_USER_USERNAME`: The super user name, is an admin.
    - `SUPER_USER_PASSWORD`: The password of the super user
    - `SUPER_USER_EMAIL`: The super user email.
    - `SUPER_USER_FIRST_NAME`: The super user first name.
    - `SUPER_USER_LAST_NAME`: The super user last name.
    - `SUPER_USER_AGE`: The super user's age.
    - `DB_PORT`: The port number of your database server.
 
## Usage

To start the backend server, run the command `npm run dev` or `yarn dev` . This will launch the server and establish a connection to the database.

# Unit tests

To start unit tests, run the command `npm run test` or `yarn tests`, the tests should all pass.

![image](https://github.com/user-attachments/assets/d9d7263e-5bb1-4627-b41d-843dbc3d7399)

# Project Structure

```
├── app                             (main folder)
│   ├── __tests__                   (unit tests folder)
│   │   ├── app                     (app test)
│   │   └── routes                  (routes test)
│   ├── app.ts                      (main file that starts the express server)
│   ├── config                      (config folder)
│   │   ├── auth                    (exports jwt secrets, refresh secrets and expiration from enviroment file)
│   │   ├── cache                   (exports redis cache keys prefixes to help readability on controllers from enviroment file)
│   │   ├── context                 (exports if the enviroment is development, test or production from enviroment file)
│   │   └── db                      (exports database name, database for test, database host, database user, and database password from enviroment file)
│   ├── controllers                 (folder that contains all the controllers)
│   │   ├── admin                   (admin controllers - get users, remove users, get shop history purchase)
│   │   ├── auth                    (auth controllers - signup, signin, refreshtoken)
│   │   ├── manager                 (manager controllers - add & remove stock items, create update delete items, create update delete categories)
│   │   └── shop                    (shop controller - get list items, get single item, get categories, get cart status, add remove update items in cart, make purchases)
│   ├── database
│   │   ├── db.config.ts            (database configuration -> sequelize connection)
│   │   └── models                  (models folder that contains all tables/models definition along with their relationships)
│   ├── global                      (used for unit tests)
│   │   ├── globalSetup.ts          (exports express instance so it can run before attempting to run any unit tests)
│   │   ├── globalTeardown.ts       (not used, but in case if developers wanna close the connection to a database)
│   │   └── jest.setup.ts           (reads dot.env before attempting to run unit tests)
│   ├── helpers                     (contains all helpful functions to be used in the proje)
│   │   └── format.ts               (helpful function that formats responses before sending to the client)
│   ├── middlewares                 (contains all the middleware logic of the app)
│   │   ├── auth                    (contains all the authentication middlewares for the app)
│   │   ├── index.ts                (serves as a barrel to export everything from middleware folder)
│   │   └── passport                (contains passport middleware for passport-jwt)
│   ├── routes                      (contains all the endpoint definitions, routes)
│   │   ├── admin                   (admin endpoints)
│   │   ├── auth                    (authentication endpoints)
│   │   ├── index.ts                (exports main route file)
│   │   ├── main.routes.ts          (main routes - - the others are nested inside this route)
│   │   ├── manager                 (manager endpoints)
│   │   ├── shop                    (shop endpoints)
│   │   └── unknown                 (for unknown endpoints)
│   ├── start                       (folder that contains data to create on the database)
│   │   ├── data                    (the data file in objects)
│   │   └── dbInitDevTest           (bulk creates the data from the data file above, using models methods)
│   ├── types                       (for global types)
│   │   ├── express.d.ts            (includes types for requests, for example if a middleware checks for the existance of a user, it can pass req.user or req.roles, or req.anything )
│   │   └── global.d.ts             (contains express type to be used in unit tests)
│   └── utils                       (location for utility functions makes it easier to update and maintain them)
│       ├── connect.ts              (connect sequelize)
│       ├── jwt.ts                  (jwt functions)
│       ├── logger.ts               (logger functions to display on console)
│       ├── redis.ts                (redis functions for setting and deleting cache keys)
│       ├── server.ts               (creates express server, and sets global middlewares)
│       └── swagger.ts              (initializes swagger js docs, for api documentation)
├── coverage                        (coverage analysis generated by testing)
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
├── jest.config.ts                 (jest configuration)
├── package.json                   (the packages used by the project)
└── tsconfig.json                  (typescript configuration)
```

# Swagger UI

__Swagger UI__ `http://localhost:3000/api-docs`

![image](https://github.com/user-attachments/assets/5c974c21-6594-41d0-823c-30a4edfa8177)



