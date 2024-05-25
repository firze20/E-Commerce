import Role from "../../database/models/Role";
import logger from "../../utils/logger";

async function initRoles() {
    logger.info("Checking if roles exist in the database...");
    const checkRoles = await Role.findAll();
    if (checkRoles.length === 0) {
        const roles = [
            {
                name: "Admin",
                description: "Admin role",
            },
            {
                name: "User",
                description: "User role",
            },
            {
                name: "Manager",
                description: "Manager role",
            }
        ];
        logger.info("Roles do not exist in the database. Creating roles...");
        await Role.bulkCreate(roles);
    }
}

export { initRoles };


