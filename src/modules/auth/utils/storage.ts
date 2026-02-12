import type { BaseUser } from "../types/user.type";

export function loadUserDataFromLocalStorage() {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const parsedUser = user ? (JSON.parse(user) as BaseUser) : null;
  return { user: parsedUser, accessToken, refreshToken };
}

export function saveUserDataToLocalStorage(
  user: BaseUser,
  accessToken: string,
  refreshToken: string,
) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearUserDataFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
