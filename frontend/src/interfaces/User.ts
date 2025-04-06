export interface User {
  id?: string; // Make 'id' optional
  name?: string;
  email?: string;
  accessToken?: string; // Add 'accessToken' if it's part of the user object
}
