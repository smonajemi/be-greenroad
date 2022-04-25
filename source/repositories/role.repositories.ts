import { db } from "../../db/db";
import { RoleEntity } from "../types/role.types";

const TABLE_NAME = "roles";
const columns = [
  "id",
  "user_id",
  "role",
  "is_deleted",
  "created_at",
  "updated_at",
  "deleted_at",
];

export const fetchRoleByUserId = async (userId: string): Promise<RoleEntity> =>
  await db<RoleEntity>(TABLE_NAME)
    .whereNull("deleted_at")
    .where("user_id", userId)
    .first(columns);

export const createRole = async (role: RoleEntity): Promise<RoleEntity[]> =>
  await db<RoleEntity>(TABLE_NAME).insert(
    { ...role, created_at: db.raw("now()"), updated_at: db.raw("now()"), is_deleted: false },
    columns
  );

export const updateRole = async (
  userId: string,
  roleId: string,
  role: RoleEntity
): Promise<RoleEntity[]> =>
  await db<RoleEntity>(TABLE_NAME)
    .where({ 'id': roleId, 'user_id': userId })
    .whereNull("deleted_at")
    .update({ ...role, updated_at: db.raw("now()") }, columns);
