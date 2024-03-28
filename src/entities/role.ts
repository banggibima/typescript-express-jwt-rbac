import { User } from "./user";

export interface Role {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  users: User[];
}
