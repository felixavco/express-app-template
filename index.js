const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

//Mongo DB connection 
const { mongoURI } = require('./config/keys');

//During production port is provided by enviroment variable
const PORT = process.env.PORT || 5000;

//Express inicialization 
const app = express();

//Set View Engile, default folder "views"
app.set('view engine', 'ejs');
//change delimiter
ejs.delimiter = '?'; 

//Setting public folder 
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//importing routes 
const root = require('./routes/root');

//Defining routes
app.use('/', root);


mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch(err => console.error(err));

