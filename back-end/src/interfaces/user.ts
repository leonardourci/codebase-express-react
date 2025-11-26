export interface IUser {
  id: number
  email: string
  passwordHash: string
  age: number
  profilePicUrl?: string
}

export interface IUserInfoByEmailResponse {
  id: number
  passwordHash: string
}
