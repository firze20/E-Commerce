import api from "../api";
import { User } from "@/context/types/Auth.types";

const URLS = {
  signIn: "/auth/signin",
  signUp: "/auth/signup",
  whoami: "/auth/whoami",
  logout: "/auth/logout",
};

export type SignUpUser = {
  username: string;
  password: string;
  email: string;
  name?: string;
  age?: number;
};

export type AuthResponse = {
  message: string;
}

export type WhoAmIResponse = {
  user: User;
}

export type SignInUser = Pick<SignUpUser, "password"> &
  ({ username: string; email?: never } | { email: string; username?: never });

/**
 * Signs up a user.
 *
 * @param data - The user data for signing up.
 * @returns A promise that resolves to the authentication response.
 */
export const signUp = (data: SignUpUser) =>
    api.post<AuthResponse>(URLS.signUp, data)
      .then((res) => res.data)

/**
 * Signs in a user.
 *
 * @param data - The user data for signing in.
 * @returns A promise that resolves to the authentication response.
 */
export const signIn = (data: SignInUser) =>
    api.post<AuthResponse>(URLS.signIn, data)
      .then((res) => res.data)

/**
 * Sends a POST request to the server to retrieve information about the authenticated user.
 * This function uses the `api` object to make the request and expects a response of type `WhoAmIResponse`.
 * The request is made with credentials included.
 * @returns A promise that resolves to the data returned by the server.
 */
export const whoami = () =>
    api.post<WhoAmIResponse>(URLS.whoami, null, { withCredentials: true })
      .then((res) => res.data)

/**
 * Logs out the user.
 * Clears all the cookies and sets the user to null and authenticated to false.
 * @returns A promise that resolves to the response data of the logout request.
 */
export const logout = () =>
    api.post<AuthResponse>(URLS.logout, null, { withCredentials: true })
      .then((res) => res.data)


