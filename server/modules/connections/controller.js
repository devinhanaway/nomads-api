import Connections from './model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
// import validateSignup from "./validateSignup"


export const newConnections =  async (req, res)=>{
  console.log("*********FWEDFWEFE************");
  // console.log(req.body);
  console.log(req.params.id);
  const { title, email, image, location} = req.body
  const connection_id = req.body._id
  console.log(connection_id);
  const user_id = req.params.id
  const newConnection = new Connections({title, email, image, location, user_id, connection_id})
  //  try{
  await newConnection.save()
  return await res.status(200).json({message: 'Added new Nomad'})
  // }
  // catch (err){
  //   return res.status(err.status).json({error: true, message:"There was an error"})
  // }
}


export const getConnections = async (req, res)=>{
  try {
    return res.status(200).json({connections: await Connections.find({'user_id': req.params.id})})
  }
  catch (err){
    return res.status(err.status).json({error: true, message:"There was an error"})
  }
}
