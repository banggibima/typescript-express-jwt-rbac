import { Profile } from "./profile";

export interface Address {
  id: string;
  street: string;
  city: string;
  zip: string;
  created_at: Date;
  updated_at: Date;
  profile_id?: string;
  profile?: Profile;
}
