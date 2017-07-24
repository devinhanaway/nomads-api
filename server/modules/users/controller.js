import User from './model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
var mongoose = require('mongoose');
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
          image: newUser.image,
          location: newUser.location
        }, config.jwtSecret)
            console.log(token,"Checking to see if it make it past jwt");
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

export const getUsers = async(req, res)=>{
    console.log(req.params.id,"*******GET ALL USERSSSSS EXPECT ME ********");
    // {email: {$not: /@domain.com/}}
    // User.find({id: {$ne: req.params.id}})
    // const email = req.params.id
    const toReturn = []
    var connectionIds = []
    var requestsSentIds = []


    await User.findOne({'_id': req.params.id}, 'connections', function (err, docs) {})
    .then(obj=>{
      var connectionIds = obj.connections
      console.log(connectionIds,"this should be all the connections");
       obj.connections.forEach(obj=>{
          toReturn.push(obj.email)
      })})

      await User.findOne({'_id': req.params.id}, 'requestsSent', function (err, docs) {})
      .then(async data=>{
        const requestsSentIds = data.requestsSent
        console.log(requestsSentIds,"this should be all the people a user has sent request too");
          data.requestsSent.forEach(data=>{
            toReturn.push(data.email)
        })})

    User.findOne({'_id': req.params.id}, 'requests', function (err, docs) {})
    .then(async data=>{
      const requestsIds = data.requests
      console.log(requestsIds,"this should be all the requests");
        data.requests.forEach(data=>{
          toReturn.push(data.email)
      })

      if(toReturn.length === (requestsIds.length+connectionIds.length+requestsSentIds.length) || connectionIds === null || requestsSentIds ){
          const search =[{ _id: { $ne: req.params.id } }]
          toReturn.forEach(item=>{
            search.push({ email: { $ne: item } })
          })
          console.log(search,"******SEARCH ARRAY *******");
          return User.find({ $and: search})
          // return User.find({ $and: [{ _id: { $ne: req.params.id } }, { email: { $ne: toReturn[0] } }, { email: { $ne: toReturn[1] } }] })
      }


// "597238ae0e2785151a331af9"


    })
    // User.where("_id").ne(req.params.id)
    .then(user=>{
      console.log("*********this should be all users not === to currentUser***********",user)
      return res.status(200).json({user: user})
    })
    .catch(err=>{
    console.log(err)
  })
}
//
// export const getUsers = (req, res)=>{
//     console.log(req.params.id,"*******GET ALL USERSSSSS EXPECT ME ********");
//     // {email: {$not: /@domain.com/}}
//     // User.find({id: {$ne: req.params.id}})
//     User.where("_id").ne(req.params.id).where("requests[0].requestLabel").equals(false)
//     .then(user=>{
//       return res.status(200).json({user: user})
//     })
//     .catch(err=>{
//     console.log(err)
//   })
// }


export const addRequest = async (req, res)=>{
  console.log("*********TRYING TO ADD A REQUEST************");
  // console.log(req.body);
  console.log(req.body);

  const id = req.body._id
  const image = req.body.image
  const title = req.body.title
  const location = req.body.location
  const email = req.body.email

  const currentUser = await decodejwt(req.params.id)
  console.log(currentUser, "this is the current user info in add request");
  console.log(id,"this is the id I'm sending a request too");



  User.findByIdAndUpdate(
    id,
    {$push: {"requests":{title: currentUser.title, image: currentUser.image, _id: currentUser.id, location: currentUser.location, email: currentUser.email}}},
    {safe: true, upsert: true},
    function(err, model){
      console.log(err,"this is the errors");
    }
  )
  User.findByIdAndUpdate(
    currentUser.id,
    {$push: {"requestsSent":{title: title, image: image, request_user_id: id, location: location, email: email}}},
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

 function decodejwt(token){
  console.log(token);
  let data = jwt.decode(token)
  console.log(data);
  return data
}


export const newConnections = async (req, res)=>{
  console.log("*********GETINNG NEW CONNECTIONS!!!! INITAL FUNCTION ************");
  // console.log(req.body);
  console.log(req.body);
  const { title, image} = req.body
  const connection_user_id = req.body._id
  // console.log(connection_user_id);
  const location = req.body.location
  const email = req.body.email

  const currentUser = decodejwt(req.params.id)
  const currentUser_id = currentUser.id
  const currentUser_title = currentUser.title
  const currentUser_image = currentUser.image
  const currentUser_location = currentUser.location
  const currentUser_email = currentUser.email
  console.log(currentUser);
  console.log("*********GETINNG NEW CONNECTIONS!!!! 2nd FUNCTION ************");


  await User.findByIdAndUpdate(
    currentUser_id,
    {$push: {"connections":{title: title, image: image, connection_user_id: connection_user_id, location: location, email: email}}},
    {safe: true, upsert: true},
    function(err, model){
      console.log(err,"this is the errors");
      return "something"
    }
  )
  // .then(()=>{
    console.log("******NOW I WANT TO UPDATE THE PERSON SENDING  THE REQUEST*******");
    await User.findByIdAndUpdate(
      connection_user_id,
      {$push: {"connections":{title: currentUser_title, image: currentUser_image, connection_user_id: currentUser_id, location: currentUser_location, email: currentUser_email}}},
      {safe: true, upsert: true},
      function(err, model){
        console.log(err,"this is the errors, DID I ADD THE USER TO THE REQUEST CONNECTIONS??????????????");
        return "something"
      }
    )
  // })
  // .then(()=>{

    // const requestInfo = User.findOne({'_id': connection_user_id}, 'requests', function (err, docs) {})

    // console.log(requestInfo,"******NOW I WANT TO DELETE  THE REQUEST*******");
    console.log("****** Lets try to effectivly remote the request*******");
    var userID = mongoose.mongo.ObjectID(currentUser_id)
    await User.findByIdAndUpdate(
    {'_id': currentUser_id},
    { $pull: { "requests" : { email: email } } })
        console.log("****** did I remove the request*******");
    // User.findByIdAndUpdate(
    //   connection_user_id,
    //   {$pull: {"requests":{email: email}}},
    //   { safe: true },
    //    function removeConnectionsCB(err, obj) {
    //        console.log("*******DOES THIS PULL REQUEST WORK*****");
    //    }
    // )
  // })

    return await res.status(200).json({message: "connection added"})

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
    console.log("***********These are connections, is there a location***************",data)
    return res.status(200).json({connections: data})
  })
  .catch((err)=>{
     console.log("failled",err)
   })

}
