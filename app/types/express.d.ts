import Role from "../database/models/Role";

declare global {
    namespace Express {
        interface Request {
            roles: Role[];
        }
    }
}