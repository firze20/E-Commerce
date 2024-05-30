import Item from "../database/models/Item"

const formatResponses = {
    formatItem: (item: Item) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            stock: item.stock.quantity,
            categories: item.categories.map((category: any) => category.name),
        }
    }
}

export default formatResponses;

