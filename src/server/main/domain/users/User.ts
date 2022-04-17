export interface User {
  id?: number;
  username: string;
  password: string;
  createdDate?: Date;
  reset?: boolean;
}