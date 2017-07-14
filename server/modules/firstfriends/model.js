import mongoose, {Schema} from 'mongoose'

let firstfriends = new Schema({
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

}, {timestamps:true});

export default mongoose.model('Firstfriends', firstfriendsSchema)
