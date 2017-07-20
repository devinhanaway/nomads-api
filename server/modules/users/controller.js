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


export const currentUser = (req, res)=>{
  // const{errors, isValid} = validateLogin(req.body)
  //req.id = req.params.id
  console.log("************currentUser was here ************");
  console.log(req.params);
  console.log(req.params.id);
  console.log(req.params.id);

  const{email} = req.body
  if(true){

      const test = User.findOne({'_id': req.params.id})
      console.log(test,"does this do anything better????");
       User.findOne({'_id': req.params.id}).then(currentUser=>{
         return res.status(200).json({currentUser: currentUser})
       })
    .catch(err=>{
      return res.status(err.status).json({error: true, message:"User doesn't exist"})
    })
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
  console.log("******* login auth  was here ************");
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

export const getUsers = (req, res)=>{
    console.log(req.params.id,"*******GET ALL USERSSSSS EXPECT ME ********");
    // {email: {$not: /@domain.com/}}
    // User.find({id: {$ne: req.params.id}})
    User.where("_id").ne(req.params.id)
    .then(user=>{
      return res.status(200).json({user: user})
    })
    .catch(err=>{
    console.log(err)
  })
}


export const addRequest = async (req, res)=>{
  console.log(req.body);
  console.log("*********FWEDFWEFE************");
  // console.log(req.body);
  console.log(req.params.id);
  const request_user_id = req.body.id
  const id = req.params.id
  const image = req.body.image
  const title = req.body.title
  const location = req.body.location
  const email = req.body.email
  console.log(id,"this is the id");
  console.log(request_user_id,"request user id is here");

  User.findByIdAndUpdate(
    id,
    {$push: {"requests":{title: title, image: image, request_user_id: request_user_id, location: location, email: email}}},
    {safe: true, upsert: true},
    function(err, model){
      console.log(err,"this is the errors");
    }
  )
  return res.status(200).json({message: 'request sent'})
}


export const getRequests = (req, res)=>{
  console.log("something was here ************");
  console.log(req.params.id);
  User.findOne({'_id': req.params.id}, 'requests', function (err, docs) {})
  .then(data=>{
    console.log(data)
    return res.status(200).json({requests: data})
  })
  .catch((err)=>{
     console.log("failled",err)
   })
}


export const newConnections = async (req, res)=>{
  console.log("*********FWEDFWEFE************");
  // console.log(req.body);
  console.log(req.params.id);
  const { title, image} = req.body
  const connection_user_id = req.body._id
  console.log(connection_user_id);
  const id = req.params.id
  const location = req.body.location
  const email = req.body.email

  User.findByIdAndUpdate(
    id,
    {$push: {"connections":{title: title, image: image, connection_user_id: connection_user_id, location: location, email: email}}},
    {safe: true, upsert: true},
    function(err, model){
      console.log(err,"this is the errors");
    }
  )

    return res.status(200).json({message: "connection added"})

  //
  // }
  // catch (err){
  //   return res.status(err.status).json({error: true, message:"There was an error"})
  // }
}

export const getConnections = (req, res)=>{
  console.log("something was here ************");
  console.log(req.params.id);
  User.findOne({'_id': req.params.id}, 'connections', function (err, docs) {})
  .then(data=>{
    console.log(data)
    return res.status(200).json({connections: data})
  })
  .catch((err)=>{
     console.log("failled",err)
   })

}
