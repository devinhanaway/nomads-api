import {Router} from "express"
import * as connectionsController from './controller'

const connectionsRouter = new Router()

connectionsRouter.post('/connections/new/:id', connectionsController.newConnections)
connectionsRouter.get('/connections/:id', connectionsController.getConnections)


export default connectionsRouter
