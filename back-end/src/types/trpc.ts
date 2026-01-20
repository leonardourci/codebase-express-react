import { Request, Response } from 'express'
import { IUser } from './user'

// tRPC Context - what gets passed to every procedure
export interface Context {
  user?: IUser
  req: Request
  res: Response
}

// Re-export the main router type for client usage
export type { AppRouter } from '../trpc/router'