import Item from "../../database/models/Item";
import Stock from "../../database/models/Stock";
import Category from "../../database/models/Category";
import CategoryItem from "../../database/models/CategoryItem";

let item: Item;

describe("Test Item model", () => {
    beforeAll(async () => {
        item = await Item.create({
            name: "Pikachu Plushie Doll",
            description: "A pokemon plushie doll",
            price: 4.99,
            image: "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P7730_701-29240_02.jpg"
        });
    });

    test("When an item is created, a stock id of that item should exist", async () => {
        // Find the stock of the item
        const stock = await Stock.findOne({
            where: {
                itemId: item.id
            }
        });

        expect(stock).not.toBeNull();
    });

    test("When an item is created, the stock quantity should be 1", async () => {
        // Find the stock of the item
        const stock = await Stock.findOne({
            where: {
                itemId: item.id
            }
        });

        expect(stock?.quantity).toBe(1);
    });

    test("When an item is created, the category of that item should automatically be set to Undefined", async() => {
        const undefined = "Undefined";

        const category = await Category.findOne({
            where: {
                name: undefined
            }
        });

        expect(category).not.toBeNull();

        const categoryItem = await CategoryItem.findOne({
            where: {
                itemId: item.id,
                categoryId: category?.id
            }
        });

        expect(categoryItem).toBeDefined();
    })

    test("Item model should have a method to add a category to the item", async () => {
        
    });
});

