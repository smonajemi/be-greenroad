import { db } from '../../db/db'
import { UserEntity } from '../types/user.types'

const TABLE_NAME = 'users'
const columns = [
    'id',
    'user_name',
    'first_name',
    'last_name',
    'password',
    'is_deleted',
    'created_at',
    'updated_at',
    'deleted_at',
]

export const fetchUsers = async (): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .whereNull('deleted_at').select(columns)

export const fetchUserById = async (userId: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME)
    .whereNull('deleted_at').where('id', userId).first(columns)

export const fetchUserByEmail = async (email: string): Promise<UserEntity> => await db<UserEntity>(TABLE_NAME)
    .whereNull('deleted_at').where('user_name', email).first(columns)

export const createUser = async (user: UserEntity): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .insert({...user, created_at: db.raw('now()'), updated_at: db.raw('now()'), is_deleted: false}, columns)

export const updateUser = async (userId: string ,user: UserEntity): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId).whereNull('deleted_at').update({...user, updated_at: db.raw('now()')}, columns)

export const deleteUser = async (userId: string): Promise<UserEntity[]> => await db<UserEntity>(TABLE_NAME)
    .where('id', userId).update({updated_at: db.raw('now()'), deleted_at: db.raw('now()'), is_deleted: true}, columns)
    