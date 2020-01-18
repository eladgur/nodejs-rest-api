let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Post = require('./api/model'), 
  routes = require('./api/routes'); 
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(express.json());

routes(app); //register the route

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);