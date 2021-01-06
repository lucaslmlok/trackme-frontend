export interface AuthState {
  tokenCheck: boolean;
  token: string;
  userId: string;
}

export interface State {
  auth: AuthState;
}
