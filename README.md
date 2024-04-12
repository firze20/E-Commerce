# E-Commerce Portfolio Project

## This is a back-end nodejs project for an e-commerce website.

### Current stage

- __To Do__:
    - [ ] __Connect the app and database__: Set up your application to be able to interface with the PostgreSQL database.
    - [ ] __Plan API endpoints__: Plan the API endpoints that will be used in retrieving data from your database.
    - [ ] __Set up user registration__: Add the logic for handling registration of new users.
    - [ ] __Set up local login__: Add the logic for handling login using a username and password.
    - [ ]  __Set up product endpoints__: Add the logic for handling CRUD operations related to products.
    - [ ]  __Set up user endpoints__: Add the logic for handling CRUD operations related to users and their accounts.
    - [ ]  __Set up cart endpoint__: Add the logic for handling CRUD operations related to a user’s cart.
    - [ ]  __Set up checkout endpoint__: Add the logic for handling checkout. There is no need to actually try and charge somebody yet; charging will come in a later evolution of this project. For now, we will assume that all charges succeed for ease of development (still add in error handling to account for times it doesn’t).
    - [ ]  __Set up order endpoint__: Add the logic for handling CRUD operations related to orders.
    - [ ] __Document the API__: Document the API you have built by adding and configuring Swagger to your project.
    - [ ] __Next Steps__: You’re welcome to expand your API beyond these project tasks and get creative! A future portfolio project will build on top of what you have built here, covering tasks for creating the client side of your e-commerce application. If you don’t want to wait that long, you can try building out a client for your API on your own!


- __In Progress__:
    - [ ] __Create PostgreSQL database and tables__: Create a PostgreSQL database and add the tables from your design.

- __Done__:
    - [x] __Design the database__: Plan out the different types of data the application will track and how those pieces of data relate.
    - [x] __Set up an Express server__: Create a directory for your project and set up a basic Express server.
    - [x] __Set up version control__: Set up Git tracking in your directory and make sure to add and commit changes as you make them.
    

### Docker

```shell
docker-compose up -d
```

# Database Schema 

Using [dbdiagram](https://dbdiagram.io/)

![alt text](ECommerce_Diagram.png)

```dbml
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  username varchar
  email varchar
  password varchar
  name varchar
  age integer
  verified boolean
  created_at timestamp
  updated_at timestamp
}

Table refreshTokens {
  token varchar
  expirity datetime
  user_id integer [ref: - users.id] 
}

Table roles {
  id integer [pk]
  name varchar
  description varchar
}

Table user_roles {
  user_id integer [ref: - users.id]
  roles_id integer [ref: - roles.id]
}

Table carts {
  id integer [pk]
  quantity integer
  user_id integer unique [ref: - users.id]
}

Table cart_items {
  cart_id integer  [ref: - carts.id]
  item_id integer [ref: - items.id]
}


Table category {
  id integer [pk]
  name varchar
  description varchar
}

Table items {
  id integer [pk]
  name varchar
  description varchar
  price float
  rating float
  item_stock_id integer [ref: - itemStocks.id]
  created_at timestamp
  updated_at timestamp
}

Table category_items {
  category_id integer [ref: - category.id]
  item_id integer [ref: - items.id]
}

Table purchases {
  id integer [pk]
  date datetime 
  user_id integer [ref: > users.id]
}

Table itemStocks {
  id integer [pk]
  item_id integer [ref: - items.id]
  stock integer

}

Table purchase_items {
  purchase_id integer [ref: - purchases.id]
  item_id integer [ref: - items.id]
}
```

__Generated PostgresSQL Schema:__

```sql
CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "name" varchar,
  "age" integer,
  "verified" boolean,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "refreshTokens" (
  "token" varchar,
  "expirity" datetime,
  "user_id" integer
);

CREATE TABLE "roles" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "user_roles" (
  "user_id" integer,
  "roles_id" integer
);

CREATE TABLE "carts" (
  "id" integer PRIMARY KEY,
  "quantity" integer,
  "user_id" integer UNIQUE
);

CREATE TABLE "cart_items" (
  "cart_id" integer,
  "item_id" integer
);

CREATE TABLE "category" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "items" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "price" float,
  "rating" float,
  "item_stock_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "category_items" (
  "category_id" integer,
  "item_id" integer
);

CREATE TABLE "purchases" (
  "id" integer PRIMARY KEY,
  "date" datetime,
  "user_id" integer
);

CREATE TABLE "itemStocks" (
  "id" integer PRIMARY KEY,
  "item_id" integer,
  "stock" integer
);

CREATE TABLE "purchase_items" (
  "purchase_id" integer,
  "item_id" integer
);

ALTER TABLE "refreshTokens" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("roles_id") REFERENCES "roles" ("id");

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "items" ADD FOREIGN KEY ("item_stock_id") REFERENCES "itemStocks" ("id");

ALTER TABLE "category_items" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "category_items" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "itemStocks" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

ALTER TABLE "purchase_items" ADD FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id");

ALTER TABLE "purchase_items" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("id");

```

*Note you should store your ``.env`` file in the root of the project*

