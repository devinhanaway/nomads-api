import {Router} from "express"
import * as loginController from './controller'

const loginRouter = new Router()

loginRouter.get('/login', loginController.login)


export default loginRouter
