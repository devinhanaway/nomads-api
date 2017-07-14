import mongoose, {Schema} from 'mongoose'

let loginSchema = new Schema({
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
  }
}, {timestamps:true});

export default mongoose.model('Login', loginSchema)
