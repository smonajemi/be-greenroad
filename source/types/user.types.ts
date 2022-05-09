import { Entity, BusinessObject } from "./default/default.types";

export interface User extends BusinessObject {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserEntity extends Entity {
  id?: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}
