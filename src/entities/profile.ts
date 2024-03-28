import { Address } from "./address";
import { User } from "./user";

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  user?: User;
  addresses: Address[];
}
