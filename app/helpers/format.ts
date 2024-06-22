import Item from "../database/models/Item";
import { map, get } from "lodash";

const formatResponses = {
    formatItem: (item: Item) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            stock: get(item, "stock.quantity", 0), // // Using Lodash get for safe access
            categories: map(item.categories, "name") // // Using Lodash get for safe access
        }
    },
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
    }
}

export default formatResponses;

