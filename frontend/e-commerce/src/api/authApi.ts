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
      .then((res) => res.data);


