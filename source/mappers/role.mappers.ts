import { Role, RoleEntity } from "../types/role.types";

export const mapRoleFromRoleEntity = (entity: RoleEntity): Role => {
  return {
    id: entity.id,
    userId: entity.user_id,
    role: entity.role,
    isDeleted: entity.is_deleted,
  };
};

export const mapRoleEntityFromRole = (role: Role): RoleEntity => {
  return {
    // no id required since uuid is generating it
    user_id: role.userId,
    role: role.role,
    is_deleted: role.isDeleted,
  };
};
