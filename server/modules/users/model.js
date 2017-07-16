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
  connections: {
    type: Schema.Types.ObjectId,
    ref:"Connections"
  },
  requests:[
  {
    title: {type: String, required: false, unique:true},
    userRequest_id: {type: String, required: false, unique:true},
    image: {type: String, required: false, unique:true},
  }]
}, {timestamps:true});

userSchema.statics.addConnection = async function(id, args){
  const Connections = mongoose.model('Connections')

  //add user id to conncetion
  const connections = await new Connections({ ...args, user: id })

  //find group with id provided by url and push the meetup into the events element
  const user = await this.findByIdAndUpdate(id, { $push: { connections: connections.id } })


  return {
    connections: await connections.save({}),
    user

  }
}

export default mongoose.model('User', userSchema)
