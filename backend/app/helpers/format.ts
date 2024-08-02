import Item from "../database/models/Item";
import User from "../database/models/User";
import Purchase from "../database/models/Purchase";
import { map, get, sumBy } from "lodash";

/**
 * A collection of formatting functions for various entities like items, cart items, users, and user lists.
 * Utilizes lodash for safe property access and mapping.
 */
const formatResponses = {
  /**
   * Formats a single item for presentation.
   * @param {Item} item - The item to format.
   * @returns An object containing formatted item details.
   */
  formatItem: (item: Item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      stock: get(item, "stock.quantity", 0), // Using Lodash get for safe access
      categories: map(item.categories, "name"), // Using Lodash map for iteration
    };
  },
  /**
   * Formats cart items with their respective quantities and total price.
   * @param {Array<{ item: Item, quantity: number }>} itemsWithQuantities - Array of items with their quantities.
   * @returns {object} - Formatted cart items and total price.
   */
  formatCartItems: (
    itemsWithQuantities: Array<{ item: Item; quantity: number }>,
  ) => {
    {
      return {
        cart: map(itemsWithQuantities, ({ item, quantity }) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
            quantity: quantity,
          };
        }),
        totalItems: sumBy(itemsWithQuantities, 'quantity'),
        totalPrice: sumBy(itemsWithQuantities, ({ item, quantity }) => item.price * quantity),
      };
    }
  },
  /**
   * Formats a single user for presentation.
   * @param {User} user - The user to format.
   * @returns An object containing formatted user details.
   */
  formatUser: (user: User) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      age: user.age,
      roles: map(user.roles, "name"),
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
  /**
   * Formats a list of users for presentation.
   * @param {User[]} users - The users to format.
   * @returns An object containing a list of formatted user details.
   */
  formatUsers: (users: User[]) => {
    return map(users, (user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        roles: map(user.roles, "name"),
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }); // Using Lodash map for iteration
  },
  /**
   * Formats a list of purchases for presentation.
   * @param {Purchase[]} purchases - The purchases to format.
   * @returns An object containing a list of formatted purchase details.
   */
  formatPurchases: (purchases: Purchase[]) => {
    return map(purchases, (purchase) => {
      return {
        id: purchase.id,
        totalPrice: purchase.totalPrice,
        createdAt: purchase.createdAt,
        items: map(purchase.purchaseItems, (purchaseItem) => {
          return {
            id: purchaseItem.item.id,
            name: purchaseItem.item.name,
            price: purchaseItem.item.price,
            image: purchaseItem.item.image,
            quantity: purchaseItem.quantity,
          };
        }),
      };
    });
  },
};

export default formatResponses;
