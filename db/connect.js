const mongoose = require('mongoose')

const connectDB = (url) => {
  console.log(`uri is ************************ --------------->>>>>> ${url}`)
  return mongoose.connect(url, {
    // useNewUrlParser: true,         // useNewUrlParser is a deprecated option
    // useCreateIndex: true,          // usecreateindex are not supported
    // useFindAndModify: false,       // usefindandmodify are not supported
    // useUnifiedTopology: true,      // useUnifiedTopology is a deprecated option
  }).then( () => console.log('Connected to DB...'))
}

module.exports = connectDB