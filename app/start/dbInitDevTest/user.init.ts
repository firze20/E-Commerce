import User from "../../database/models/User";
import { superUser } from "../data/data";
import logger from "../../utils/logger";

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

      await createdUser.addRoles(["Admin", "User"]);

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
