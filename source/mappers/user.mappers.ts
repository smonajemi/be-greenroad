import { User, UserEntity } from "../types/user.types";

export const mapUserFromUserEntity = (entity: UserEntity): User => {
  return {
    id: entity.id,
    userName: entity.user_name,
    firstName: entity.first_name,
    lastName: entity.last_name,
    password: entity.password,
    isDeleted: entity.is_deleted,
  };
};

export const mapUserEntityFromUser = (user: User): UserEntity => {
  return {
    // no id required since uuid is generating it
    user_name: user.userName,
    first_name: user.firstName,
    last_name: user.lastName,
    password: user.password,
    is_deleted: user.isDeleted,
  };
};
