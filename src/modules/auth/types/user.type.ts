export interface BaseUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  authType: string;
}

export interface AuthTokensWithUser {
  user: BaseUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthApiRes {
  success: boolean;
  data: AuthTokensWithUser;
}
