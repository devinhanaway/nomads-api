import mongoose from 'mongoose'

export default()=>{
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/nomads')
  mongoose.connection
    .once('open', ()=> console.log('mongoose is running'))
    .on('error', err => console.error(err))
}
