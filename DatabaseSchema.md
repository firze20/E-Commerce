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