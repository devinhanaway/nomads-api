import mongoose, {Schema} from 'mongoose'

let connectionsSchema = new Schema({
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
  }, {timestamps:true});



export default mongoose.model('Connections', connectionsSchema)
