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

Category.belongsToMany(Item, {
    through: "item_categories",
    as: "items",
    foreignKey: "category_id",
});





const dbInit = () => {
   
}