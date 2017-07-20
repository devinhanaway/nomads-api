import {Router} from "express"
import * as userController from './controller'

const userRouter = new Router()

userRouter.post('/users/new', userController.signup)
userRouter.get('/users', userController.getUsers)
userRouter.get('/users/:id', userController.currentUser)
userRouter.post('/users/:email', userController.loginAuth)
userRouter.post('/users/request/new/:id', userController.addRequest)
userRouter.get('/users/request/:id', userController.getRequests)
userRouter.post('/users/connections/:id', userController.newConnections)
userRouter.get('/users/connections/:id', userController.getConnections)


// userRouter.post('/users/login', userController.login)


export default userRouter
