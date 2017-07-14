import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'


export default app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cors())
  app.use(morgan('dev'))
}
