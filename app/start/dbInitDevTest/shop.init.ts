import Category from "../../database/models/Category";
import Item from "../../database/models/Item";
import logger from "../../utils/logger";

// Data to be imported
import { categoriesData } from "../data/data";

async function initShop() {
    logger.info("Creating categories if they do not exist in the database...");
    const checkCategories = await Category.findAll();

    if(checkCategories.length === 0) {
        logger.info("Categories do not exist in the database. Creating categories...");
        await Category.bulkCreate(categoriesData);
    }
    return;
}

async function createItems() {
    logger.info("Creating items if they do not exist in the database...");
    const checkItems = await Item.findAll();

    if(checkItems.length === 0) {
        const items = [
            {

            }
        ]
    }
}

export { initShop };

