import {User, Cart, Category, Item, ItemStock, Purchase, RefreshTokens, Roles} from "./models";
const isDev = process.env.NODE_ENV === 'development';


// Relationships 

// User Roles 
Roles.belongsToMany(User, {
    through: "user_roles",
    as: "users",
    foreignKey: "role_id",
});

User.belongsToMany(Roles, {
    through: "user_roles",
    as: "roles",
    foreignKey: "user_id",
});
//*End User Roles

// User has One CartCart

Cart.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    targetKey: "id",
});

// *End User Carts

// User Purchases

Purchase.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
    targetKey: "id",
});

User.hasMany(Purchase, {
    foreignKey: "user_id",
    as: "purchases",
    sourceKey: "id",
});

//*End User Purchases

// Item belongs to Many Categories
Item.belongsToMany(Category, {
    through: "item_categories",
    as: "categories",
    foreignKey: "item_id",
});
//Category belongs to Many Item
Category.belongsToMany(Item, {
    through: "item_categories",
    as: "items",
    foreignKey: "category_id",
});


// Purchase can have many items

Purchase.belongsToMany(Item, {
    through: "purchase_items",
    as: "items",
    foreignKey: "purchase_id",
});

//Item can be purchased many times

Item.belongsToMany(Purchase, {
    through: "purchase_items",
    as: "purchases",
    foreignKey: "item_id",
});

ItemStock.hasOne(Item, {
    foreignKey: "item_id",
    as: "item",
    sourceKey: "id",
});

Item.hasOne(ItemStock, {
    foreignKey: "item_id",
    as: "itemStock",
    sourceKey: "id",
});

Cart.belongsToMany(Item, {
    through: "cart_items",
    as: "items",
    foreignKey: "cart_id",
});

Item.belongsToMany(Cart, {
    through: "cart_items",
    as: "carts",
    foreignKey: "item_id",
});



const dbInit = () => {
   User.sync({force: isDev});
   Cart.sync({force: isDev});
   Category.sync({force: isDev});
   Item.sync({force: isDev});
   //ItemStock.sync({force: isDev});
   Purchase.sync({force: isDev});
}

export default dbInit;