import { ApiRequestConfig } from "./api.types";
import api from "./api";

const URLS = {
  signIn: "/auth/signin",
  signUp: "/auth/signup",
  refreshToken: "/auth/refresh-token",
};

export type SignUpUser = {
  username: string;
  password: string;
  email: string;
  name?: string;
  age?: number;
};

export type SignInUser = Pick<SignUpUser, "password"> &
  ({ username: string; email?: never } | { email: string; username?: never });

export const signUp = (data: SignUpUser, config: ApiRequestConfig = {}) =>
    api.post(URLS.signUp, data, config);

export const signIn = (data: SignInUser, config: ApiRequestConfig = {}) =>
    api.post(URLS.signIn, data, config);

export const refreshToken = (config: ApiRequestConfig = {}) =>
    api.post(URLS.refreshToken, {}, config);


