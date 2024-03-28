import { Profile } from "./profile";
import { Role } from "./role";

export interface User {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  profile_id?: string;
  profile?: Profile;
  roles: Role[];
}
