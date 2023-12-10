const express = require('express'); // npm i express
require('dotenv').config(); // npm i dotenv
const mongoose = require('mongoose'); // npm i mongoose
const cors = require('cors') // npm i cors (its for the cross origin resource sharing - to allow the frontend to access the backend data)

const itemRoute = require('./routes/itemRoute'); 
const errorMiddleware = require('./middleware/errorMiddleware');




const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173'




app.use(express.json());
app.use(express.urlencoded({extended: false})); // in case if u want to use in postman the urlencoded instead of json

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//! middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/api/items', itemRoute);
app.use(errorMiddleware)




// app.get('/', (req, res) => res.send('Home Page'));

app.get('/', (req, res) => {
  res.send('Home Page')
  // throw new Error('BROKEN') 
})

//! Connect to MongoDB Atlas
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected...');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });