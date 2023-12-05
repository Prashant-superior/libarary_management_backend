const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require('./config/db');
const { config } = require('dotenv');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// middleware

app.use(express.json());


// routes

app.use('/api/v1/books', bookRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

// app.get('/',  (req, res) => {
//   res.send('backend works')
// })

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
      )
  } catch (error) {
    console.log(error);
  }
};

start()