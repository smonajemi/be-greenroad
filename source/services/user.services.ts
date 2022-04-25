import { User } from "../types/user.types";
import * as userRepository from "../repositories/user.repositories";
import * as roleRepository from "../repositories/role.repositories";
import {
  mapUserEntityFromUser,
  mapUserFromUserEntity,
} from "../mappers/user.mappers";
import { Role, RoleEntity } from "../types/role.types";
import { findRoleByUserId, createRole } from "../services/role.services";

export const fetchUsers = async (): Promise<User[] | any> => {
  const result = await userRepository.fetchUsers();
  return { ...result };
};

export const findUserById = async (userId: string): Promise<User> => {
  const user = await userRepository.fetchUserById(userId);
  if (!user) {
    throw new Error(`Cannot find user by id ${userId}`);
  }
  const response = mapUserFromUserEntity(user);
  return response;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await userRepository.fetchUserByEmail(email);
  if (!user) {
    return null;
  }
  const response = mapUserFromUserEntity(user);
  return response;
};

export const createUser = async (
  user: User,
  role?: Role
): Promise<User | any> => {

  const existingUser = await findUserByEmail(user.userName);
  if (existingUser) {
    throw new Error(`User ${user.userName} already exists`);
  }
  const getRole = user as any
  const userEntity = mapUserEntityFromUser(user);
  const [db_response] = await userRepository.createUser(userEntity);
  const newProfile: Role = role
    ? role
    : {
      userId: db_response.id as string,
      role: getRole.role,
      isDeleted: false,
    };
  const profile = await findRoleByUserId(newProfile.userId);
  const result = profile ? profile : await createRole(newProfile);
  const response = mapUserFromUserEntity(db_response);
  return { ...response, roleEntity: result };
};

export const updateUser = async (userId: string, user: User): Promise<User> => {
  const userEntity = mapUserEntityFromUser(user);
  const [db_response] = await userRepository.updateUser(userId, userEntity);
  const response = mapUserFromUserEntity(db_response);
  return response;
};

export const deleteUser = async (userId: string): Promise<User | any> => {
  const user = await userRepository.fetchUserById(userId);
  if (!user) {
    throw new Error(`User does not exist`);
  }

  const roleEntity: RoleEntity = await roleRepository.fetchRoleByUserId(userId)
  roleEntity.is_deleted = true
  roleEntity.deleted_at = new Date().toISOString()
  await roleRepository.updateRole(userId, roleEntity.id as string, roleEntity)
  const [db_response] = await userRepository.deleteUser(userId);
  const response = mapUserFromUserEntity(db_response);
  return { ...response, roleEntity: roleEntity }
};
