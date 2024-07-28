export enum Roles {
    Admin = "Admin",
    User = "User",
    Manager = "Manager",
}

export type User = {
    id: number;
    name: string;
    roles: Roles[];
}

export type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
};


