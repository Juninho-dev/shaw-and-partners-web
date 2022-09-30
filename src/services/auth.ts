import { setCookie } from "nookies";
import { api } from "./api";

export function login(token: string) {
  setCookie(undefined, "shaw-token", token, {
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30), // 30 days
    path: "/",
  });

  api.defaults.params = {
    token,
  };
}
