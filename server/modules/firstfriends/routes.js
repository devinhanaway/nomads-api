import {Router} from "express"
import * as firstfriendsController from './controller'

const firstfriendsRouter = new Router()

firstfriendsRouter.post('/friends/new', firstfriendsController.friends)


export default firstfriendsRouter
