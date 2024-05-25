import Role from "../../database/models/Role";
import logger from "../../utils/logger";

import { rolesData } from "../data/data";

async function initRoles() {
    logger.info("Checking if roles exist in the database...");
    const checkRoles = await Role.findAll();
    if (checkRoles.length === 0) {
        await Role.bulkCreate(rolesData);
        logger.info("There is roles in the database");
    }
    return;
}

export { initRoles };


