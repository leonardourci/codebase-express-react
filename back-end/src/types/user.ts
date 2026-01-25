import z from "zod"

import { IBaseModel } from "./base"
import { updateUserSchema } from "../utils/validations/user.schemas"

export interface IUser extends IBaseModel {
  email: string
  fullName: string
  phone: string
  age: number
  passwordHash: string
  refreshToken?: string
}

export interface IUserProfile extends Pick<IUser, 'id' | 'age' | 'email' | 'fullName' | 'phone'> { }

export interface ICreateUserInput {
  fullName: string
  email: string
  passwordHash: string
  age: number
  phone: string
}

export enum EUserDbRowKeys {
  id = 'id',
  email = 'email',
  fullName = 'full_name',
  phone = 'phone',
  age = 'age',
  passwordHash = 'password_hash',
  refreshToken = 'refresh_token',
  createdAt = 'created_at',
  updatedAt = 'updated_at'
}

export interface IUserDbRow {
  id?: string
  email?: string
  full_name?: string
  phone?: string
  age?: number
  password_hash?: string
  refresh_token?: string
  created_at?: Date
  updated_at?: Date | null
}

export interface IUserInfoByEmailResponse {
  id: string
  passwordHash: string
}

export type TUpdateUserInput = z.infer<typeof updateUserSchema>