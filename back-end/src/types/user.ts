import { IBaseModel } from "./base"

export interface IUser extends IBaseModel {
  email: string
  fullName: string
  phone: string
  age: number
  passwordHash: string
  refreshToken?: string
}

export interface ICreateUserInput {
  fullName: string
  email: string
  passwordHash: string
  age: number
  phone: string
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