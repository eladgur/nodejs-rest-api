require('dotenv').config()

let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  db = process.env.DB,
  mongoose = require('mongoose'),
  Post = require('./api/model'), 
  routes = require('./api/routes'); 
  
mongoose.Promise = global.Promise;
mongoose.connect(db); 

app.use(express.json());

routes(app); //register the route

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);