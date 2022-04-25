import { Entity, BusinessObject } from "./default/default.types";

export interface User extends BusinessObject {
  id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: number;
  isDeleted: boolean;
}

export interface UserEntity extends Entity {
  id?: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: number;
  is_deleted: boolean;
}
