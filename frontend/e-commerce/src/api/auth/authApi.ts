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

export const signUp = (data: SignUpUser) =>
    api.post<AuthResponse>(URLS.signUp, data)
      .then((res) => res.data)

export const signIn = (data: SignInUser) =>
    api.post<AuthResponse>(URLS.signIn, data)
      .then((res) => res.data)

export const whoami = () =>
    api.post<WhoAmIResponse>(URLS.whoami, null, { withCredentials: true })
      .then((res) => res.data)

export const logout = () =>
    api.post<AuthResponse>(URLS.logout, null, { withCredentials: true })
      .then((res) => res.data)


