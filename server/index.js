import express from 'express'
import cors from 'cors'
import {userRoutes, loginRoutes} from './modules'
import db from "./config/db"
import middleware from './config/middleware'
const app = express()

db()
middleware(app)
const port = process.env.PORT || 8080

// app.use(cors())
app.use('/api', [userRoutes, loginRoutes])



//
// const dbUrl = 'mongodb://localhost/nomads'
// mongodb.MongoClient.connect(dbUrl, function(err, db) {
//
//

  //
  // app.get('/api/users', (req, res) => {
  //   db.collection('users').find({}).toArray((err, users) => {
  //     res.json({ users })
  //   })
  // })


  app.use((req, res)=> {
    res.status(404).json({
      errors: {
        global: "Still working on it, please try this again later :)"
      }
    })
  })



  //
  // app.post('/api/users', (req, res) => {
  //   const {errors, isValid } = validateSignup(req.body);
  //   if (isValid){
  //     const { title, email, password, image, location} = req.body
  //     db.collection("users").insert({title, email, password, image, location}, (err, result)=> {
  //       if(err){
  //         res.status(500).json({errors: {global: "something went wrong"}})
  //       } else{
  //         res.json({user: result.ops[0]})
  //       }
  //     })
  //   }else{
  //     res.status(400).json({errors})
  //   }
  // })


    app.listen(port, () => console.log(`'server listening on ${port}'`));
