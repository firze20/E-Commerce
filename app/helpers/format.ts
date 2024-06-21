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
    }
}

export default formatResponses;

