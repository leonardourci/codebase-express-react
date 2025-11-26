import { EStatusCodes } from '../domain/statusCodes'

export interface IPerformJsonCallback<T> {
  status: EStatusCodes
  response: T
}
