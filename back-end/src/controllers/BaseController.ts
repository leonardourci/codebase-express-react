import IRepositories from '../interfaces/repository'

export default abstract class BaseController {
  constructor(protected readonly repository: IRepositories) {}
}
