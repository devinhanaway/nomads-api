import mongoose, {Schema} from 'mongoose'

let connectionsSchema = new Schema({
  connection_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ,
  title: {
    type: String,
    unique: false,
    required: true
  } ,
  email: {
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
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
  }, {timestamps:true});



export default mongoose.model('Connections', connectionsSchema)
