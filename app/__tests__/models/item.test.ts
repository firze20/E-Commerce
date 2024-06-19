import Item from "../../database/models/Item";
import Stock from "../../database/models/Stock";

describe("Test Item model", () => {
    test("When an item is created, a stock id of that item should exist", async () => {
        // Create an item
        const item = await Item.create({
            name: "Pikachu Plushie Doll",
            description: "A pokemon plushie doll",
            price: 4.99,
            image: "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P7730_701-29240_02.jpg"
        });

        expect(item.name).toBe("Pikachu Plushie Doll");

        // Find the stock of the item
        const stock = await Stock.findOne({
            where: {
                itemId: item.id
            }
        });

        expect(stock).not.toBeNull();
    })
})