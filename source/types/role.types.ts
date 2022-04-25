import { Entity, BusinessObject } from "./default/default.types";

export interface Role extends BusinessObject {
  id?: string;
  userId: string;
  role: string;
  isDeleted: boolean;
}

export interface RoleEntity extends Entity {
  id?: string;
  user_id: string;
  role: string;
  is_deleted: boolean;
}
