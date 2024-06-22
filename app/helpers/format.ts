import Item from "../database/models/Item";
import User from "../database/models/User";
import { map, get } from "lodash";

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
            categories: map(item.categories, "name") // Using Lodash map for iteration
        }
    },
    /**
     * Formats a list of items as cart items, including a total price.
     * @param {Item[]} items - The items to format as cart items.
     * @param {number} totalPrice - The total price of all items in the cart.
     * @returns An object containing a list of cart items and the total price.
     */
    formatCartItems: (items: Item[], totalPrice: number) => {
        return {
            cart: map(items, (item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.stock
                };
            }),
            totalPrice
        };
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
        }
    },
    /**
     * Formats a list of users for presentation.
     * @param {User[]} users - The users to format.
     * @returns An object containing a list of formatted user details.
     */
    formatUsers: (users: User[]) => {
        return {
            users: map(users, (user) => {
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
                }
            }), // Using Lodash map for iteration
        }
    }
}

export default formatResponses;

