export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user?: User;
  error: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};
