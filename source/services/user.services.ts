import { User } from "../types/user.types";
import * as userRepository from "../repositories/user.repositories";
import * as roleRepository from "../repositories/role.repositories";
import {
  mapUserEntityFromUser,
  mapUserFromUserEntity,
} from "../mappers/user.mappers";
import { Role, RoleEntity } from "../types/role.types";
import { findRoleByUserId, createRole } from "../services/role.services";
import bcrypt from 'bcrypt'
export const fetchUsers = async (): Promise<User[] | any> => {
  const result = await userRepository.fetchUsers();
  return result; 
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

export const loginUser = async (username: string, password: string): Promise<User | null> => {
  const existingUser = await findUserByEmail(username)
  if (!existingUser) {
    throw new Error('Invalid Username')
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    throw new Error('Invalid Password')
  } 
  const userEntity = mapUserEntityFromUser(existingUser)
  const [db_response] = await userRepository.updateUser(existingUser.id as any, userEntity)
  const response = mapUserFromUserEntity(db_response)
  return response
}

export const createUser = async (
  user: User,
  role?: Role
): Promise<User | any> => {

  const existingUser = await findUserByEmail(user.username);
  if (existingUser) {
    throw new Error(`User ${user.username} already exists`);
  }
  const getRole = user as any
  const userEntity = mapUserEntityFromUser(user);
  const salt = await bcrypt.genSalt(10);
  userEntity.password = user.password && user.password !== '' ?  await bcrypt.hash(user.password, salt) : ''
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
