import api from "./api";
import { User } from "@/context/types/Auth.types";

const URLS = {
  signIn: "/auth/signin",
  signUp: "/auth/signup",
  refreshToken: "/auth/refresh-token",
  whoami: "/auth/whoami",
};

export type SignUpUser = {
  username: string;
  password: string;
  email: string;
  name?: string;
  age?: number;
};

type AuthResponse = {
  message: string;
}

export type SignInUser = Pick<SignUpUser, "password"> &
  ({ username: string; email?: never } | { email: string; username?: never });

export const signUp = (data: SignUpUser) =>
    api.post<AuthResponse>(URLS.signUp, data)

export const signIn = (data: SignInUser) =>
    api.post<AuthResponse>(URLS.signIn, data)

export const refreshToken = () =>
    api.post<AuthResponse>(URLS.refreshToken, null)

export const whoami = () =>
    api.post<User>(URLS.whoami, null, { withCredentials: true })


