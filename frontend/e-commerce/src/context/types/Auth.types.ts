export type JwtPayload = {
    id: number;
    name: string;
    roles: string[];
}

export type AuthState = {
    isAuthenticated: boolean;
    user: JwtPayload | null;
    roles: string[];
};


