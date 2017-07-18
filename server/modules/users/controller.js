import User from './model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
// import validateSignup from "./validateSignup"



export function validateSignup(data){
  let errors = {}
  if(data.title === "") errors.title = "Please Provide a Title"
  if(data.email === "") errors.email = "Please Provide a Email"
  if(data.password === "") errors.password = "Please Provide a Password"
  if(data.passwordConfirmation != data.password) errors.passwordConfirmation = "Password Confirmation Must match Password"
  if(data.image === "") errors.image = "Please Provide an Image URL"
  if(data.location === "") errors.location = "Please Provide some location for your post"
  const isValid = Object.keys(errors).length === 0
  return {errors, isValid};
}


export const currentUser = async (req, res)=>{
  // const{errors, isValid} = validateLogin(req.body)
  //req.id = req.params.id
  console.log("something was here ************");
  console.log(req.params);
  console.log(req.params.id);
  console.log(req.params.id);

  const{email} = req.body
  if(true){
    try {
      const test = User.findOne({'_id': req.params.id})
      console.log(test,"does this do anything better????");
      return res.status(200).json({currentUser: await User.findOne({'_id': req.params.id})})
    }
    catch(err){
      return res.status(err.status).json({error: true, message:"User doesn't exist"})
    }
  }
}

// export const loginAuth = async (req, res)=>{
//   // const{errors, isValid} = validateLogin(req.body)
//   //req.id = req.params.id
//   console.log("something was here ************");
//   console.log(req.body);
//   console.log(req.body.email);
//   // console.log(req.id);
//   req.params.id
//   const{email} = req.body
//   if(true){
//     try {
//       return res.status(200).json({user: await User.findOne({'email': req.body.email})
//     })
//     }
//     catch(err){
//       return res.status(err.status).json({error: true, message:"User doesn't exist"})
//     }
//   }
// }


function validateLogin(data){
  let errors = {}
  if(data.email === "") errors.email = "Please Provide a Email"
  if(data.password === "") errors.password = "Please Provide a Password"
  const isTrue = Object.keys(errors).length === 0
  return {errors, isTrue};
}


export const loginAuth = (req, res)=>{
  const {errors, isTrue } = validateLogin(req.body);
  console.log("something was here ************");
  console.log(req.body);
  console.log(req.body.email);

  if(isTrue){

  User.findOne({'email': req.body.email}).then(user=>{

    if(user){
    console.log("let's see what user data we are getting back");
    console.log(user.password_digest);
    console.log(req.body.password);
    bcrypt.compare(req.body.password, user.password_digest, (err,result)=>{
      if(result === true){
        const token = jwt.sign({
          id: user.id,
          title: user.title,
          email: user.email,
          image: user.image
        }, config.jwtSecret)
        return res.status(200).json({token: token})
      }else{
        return res.status(401).json({error: true, message:"incorrect password"})
      }
    })
  }else{
    return res.status(401).json({error: true, message:"User doesn't exist"})
  }
  })
}else{
  res.status(400).json({errors})

}
}

 export const signup = (req, res, next)=>{
   console.log(req.body);

  const {errors, isValid } = validateSignup(req.body);
  const { title, email, password, passwordConfirmation, image, location} = req.body
    if (isValid){
      const password_digest = bcrypt.hashSync(password, 10)
      const newUser = new User({title, email, password, password_digest, passwordConfirmation, image, location})
      console.log(newUser,"this is the new user info to be submited");
          const token =jwt.sign({
          id: newUser.id,
          title: newUser.title,
          email: newUser.email,
          image: newUser.image
        }, config.jwtSecret)
            console.log("Checking to see if it make it past jwt");
           newUser.save().then(()=>{
             "Does it save the new ueser"
             return res.status(200).json({token: token})
           }) .catch(function (err) {
              next(err);
            })

        console.log(token,"this is a JSON WEB TOKEN");
          //
          // await newUser.save()
          //   return res.status(200).json({token: token})
    }else{
        res.status(400).json({errors})
      }
  }
 // export const signup = async (req, res)=>{
 //   console.log(req.body);
 //
 //  const {errors, isValid } = validateSignup(req.body);
 //  const { title, email, password, passwordConfirmation, image, location} = req.body
 //    if (isValid){
 //      const password_digest = bcrypt.hashSync(password, 10)
 //      const newUser = await new User({title, email, password, password_digest, passwordConfirmation, image, location})
 //      console.log(newUser,"this is the new user info to be submited");
 //      try{
 //        console.log("something");
 //
 //        const getToken = async ()={
 //          const token =jwt.sign({
 //          id: newUser.id,
 //          title: newUser.title,
 //          email: newUser.email,
 //          image: newUser.image
 //        }, config.jwtSecret)
 //        return token
 //      }
 //        console.log(token,"this is a JSON WEB TOKEN");
 //          // newUser.save()
 //          // return await res.status(200).json({token: await token})
 //          await newUser.save()
 //            return res.status(200).json({token: token})
 //      } catch (err){
 //        return res.status(err.status).json({error: true, message:"There was an error"})
 //      }
 //    }else{
 //        res.status(400).json({errors})
 //      }
 //  }

export const getUsers = async (req, res)=>{
  try {
    return res.status(200).json({user: await User.find({})})
  }
  catch (err){
    return res.status(err.status).json({error: true, message:"There was an error"})
  }
}


export const addRequest =  async (req, res)=>{
  console.log(req.body);
  console.log("*********FWEDFWEFE************");
  // console.log(req.body);
  console.log(req.params.id);
  const request_user_id = req.params.id
  const id = req.body._id
  const image = req.body.image
  const title = req.body.title

  await User.findByIdAndUpdate(
    id,
    {$push: {"requests":{title: title, image: image, request_user_id: request_user_id}}},
    {safe: true, upsert: true},
    function(err, model){
      console.log(err);
    }
  )
   return res.status(200).json({message: 'request sent'})
}

export const getRequests = async (req, res)=>{
  console.log("something was here ************");
  console.log(req.params.id);



  return res.status(200).json({requests: await User.findOne({'_id': req.params.id}, 'requests', function (err, docs) {})})
}


export const newConnections =  async (req, res)=>{
  console.log("*********FWEDFWEFE************");
  // console.log(req.body);
  console.log(req.params.id);
  const { title, email, image, location} = req.body
  const connection_id = req.body._id
  console.log(connection_id);
  const user_id = req.params.id
  const newConnection = new User({title, email, image, location, user_id, connection_id})
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
    return res.status(200).json({connections: await User.find({'user_id': req.params.id})})
  }
  catch (err){
    return res.status(err.status).json({error: true, message:"There was an error"})
  }
}
