import mongoose from 'mongoose'

//for localhost

export default()=>{
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/nomads')
  mongoose.connection
    .once('open', ()=> console.log('mongoose is running'))
    .on('error', err => console.error(err))
}

//for production heroku pushes

// export default()=>{
//   mongoose.Promise = global.Promise
//   mongoose.connect('mongodb://heroku_5g49gcc3:itet1ag4pl2jfu76pjsghvd1pk@ds157282.mlab.com:57282/heroku_5g49gcc3')
//   mongoose.connection
//     .once('open', ()=> console.log('mongoose is running'))
//     .on('error', err => console.error(err))
// }
