import api from "../api";
import { UsersList } from "../types/Users.type";
import { ApiRequestConfig } from "../api.types";
import { buildQueryString } from "@/helpers/buildQueryString";

const URLS = {
    admin: {
        getUsers: "/admin/users",
        getSingleUser: (id: number) => `/admin/users/${id}`,
        getPurchases: "/admin/purchases",
    }
}

// Users API 

/**
 * Retrieves a list of users from the server.
 * @param params - The parameters for the API request.
 * @returns A Promise that resolves to the response data containing the list of users.
 */

export const getUsers = (params: Record<string, any>, config: ApiRequestConfig) => {
    const queryString = buildQueryString(params);
    return api
        .get<UsersList>(`${URLS.admin.getUsers}${queryString}`, {
            withCredentials: true,
            ...config,
        })
        .then((res) => res.data);
};

/**
 * Retrieves a single user from the server.
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the response data containing the user.
 */
export const getSingleUser = (id: number, config: ApiRequestConfig) => {
    return api
        .get(`${URLS.admin.getSingleUser(id)}`, {
            withCredentials: true,
            ...config,
        })
        .then((res) => res.data);
};
