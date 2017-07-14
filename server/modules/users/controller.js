import User from './model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
// import validateSignup from "./validateSignup"



export default function validateSignup(data){
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

  console.log(req.id);
  // req.params.id
  const{email} = req.body
  if(true){
    try {
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
          email: user.email
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
  // console.log(currentUser);
  // if(true){
  //   try {
  //     return res.status(200).json({user: await User.findOne({'email': req.body.email})
  //   })
  //   }
  //   catch(err){
  //     return res.status(err.status).json({error: true, message:"User doesn't exist"})
  //   }
  // }
}

 export const signup = async (req, res)=>{

  const {errors, isValid } = validateSignup(req.body);
  const { title, email, password, passwordConfirmation, image, location} = req.body
    if (isValid){
      const password_digest = bcrypt.hashSync(password, 10)
      const newUser = new User({title, email, password, password_digest, passwordConfirmation, image, location})

      try{
        console.log("something");
        return res.status(200).json({user: await newUser.save()})
      }
      catch (err){
        return res.status(err.status).json({error: true, message:"There was an error"})
      }
    }else{
        res.status(400).json({errors})
      }
  }

export const getUsers = async (req, res)=>{
  try {
    return res.status(200).json({user: await User.find({})})
  }
  catch (err){
    return res.status(err.status).json({error: true, message:"There was an error"})
  }
}
