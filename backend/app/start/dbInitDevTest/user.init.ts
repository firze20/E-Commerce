import User from "../../database/models/User";
import { superUser } from "../data/data";
import logger from "../../utils/logger";
import Role from "../../database/models/Role";

async function initSuperUser() {
  logger.info("Checking if super user exist in the database...");
  const checkSuperUser = await User.findOne({
    where: {
      username: superUser.username,
    },
  });
  if (checkSuperUser === null) {
    try {
      const createdUser = await User.create(superUser);

      const roles = await Role.findAll({
        where: {
          name: ["Admin", "User"],
        },
      });

      if (roles) {
        await createdUser.addRoles(roles);
      }

      logger.info("Super user created in the database");
    } catch (error) {
      logger.error("Super user creation failed:", error);
    }
  } else {
    logger.info("Super user already exist in the database");
  }
  return;
}

export { initSuperUser };
