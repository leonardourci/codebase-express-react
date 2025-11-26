export interface IUser {
  id: number
  email: string
  passwordHash: string
  age: number
}

export interface IUserInfoByEmailResponse {
  id: number
  passwordHash: string
}
