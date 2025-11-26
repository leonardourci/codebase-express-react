import IRepositories from '../interfaces/repository'
import UserRepository from './User.repository'

const repositories: IRepositories = {
  user: new UserRepository()
}

export default repositories
