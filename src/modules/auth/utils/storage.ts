import type { BaseUser } from "../types/user.type";

export function getUserByLocalStorage() {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const parsedUser = JSON.parse(user as string) as BaseUser;
  return { user: parsedUser, accessToken, refreshToken };
}
