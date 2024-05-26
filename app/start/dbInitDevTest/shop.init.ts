import Category from "../../database/models/Category";
import Item from "../../database/models/Item";
import logger from "../../utils/logger";

// Data to be imported
import { categoriesData, itemsData } from "../data/data";

async function initShop() {
    logger.info("Creating categories if they do not exist in the database...");
    const checkCategories = await Category.findAll();

    if(checkCategories.length === 0) {
        logger.info("Categories do not exist in the database. Creating categories...");
        await Category.bulkCreate(categoriesData);
        logger.info("Categories created in the database");
    }
    return;
}

async function initItems() {
    logger.info("Creating items if they do not exist in the database...");
    const checkItems = await Item.findAll();

    if(checkItems.length === 0) {
       logger.info("Items do not exist in the database. Creating items...");
       await Item.bulkCreate(itemsData);
       logger.info("Items created in the database");
    }
}

export { initShop, initItems };

