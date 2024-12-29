import { Roles } from "@/context/types/Auth.types"

export type User = {
    id: number,
    username: string,
    email: string,
    name: string,
    age: number,
    roles: Roles[],
    verified: boolean,
    createdAt: string,
    updatedAt: string,
};

export type UsersList = {
    users: User[],
    totalPages: number,
    currentPage: number,
    perPage: number,
};