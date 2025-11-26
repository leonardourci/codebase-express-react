import express from 'express'

import { ExpressAdapter } from '../adapters'
import AuthController from '../controllers/AuthController'
import repositories from '../repositories'

const router = express.Router()

const authController = new AuthController(repositories)

router.post('/login', ExpressAdapter.performJson(authController.login))
router.post('/signup', ExpressAdapter.performJson(authController.signup))

export default router
