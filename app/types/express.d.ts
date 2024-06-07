import Role from "../database/models/Role";

// To attach to request middlewares

declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
            email: string;
            name?: string;
            age?: number;
            roles?: string[];
        }
        interface Request {
            roles?: Role[]; // May make it optional later not sure if it will cause problems 
            user?: User;
        };
    }
}