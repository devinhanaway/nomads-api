import mongoose, {Schema} from 'mongoose'


let userSchema = new Schema({
  title: {
    type: String,
    unique: false,
    required: true
  } ,
  email: {
    type: String,
    unique: true,
    required: true
  } ,
  password: {
    type: String,
    unique: false,
    required: true
  } ,
  password_digest: {
    type: String,
    unique: true,
    required: true
  } ,
  location: {
    type: String,
    unique: false,
    required: true
  } ,
  image: {
    type: String,
    unique: false,
    required: true
  }
  ,
  passwordConfirmation: {
    type: String,
    unique: false,
    required: true
  },
  requests:[
    {
    title: {type: String, required: false, unique:false},
    userRequest_id: {type: String, required: false, unique:false},
    image: {type: String, required: false, unique:false},
    location: {type: String, required: false, unique:false},
    email: {type: String, required: false, unique:false},
  }
],
  connections:[
    {
    connection_user_id:{type: String, required: false, unique:false},
    title: {type: String, required: false, unique:false},
    image: {type: String, required: false, unique:false},
    location: {type: String, required: false, unique:false},
    email: {type: String, required: false, unique:false},
  }
]
}, {timestamps:true});



export default mongoose.model('User', userSchema)
