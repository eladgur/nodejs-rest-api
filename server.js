let config = require('dotenv').config(),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 3000,
  DB_HOST = process.env.DB,
  mongoose = require('mongoose'),
  Post = require('./api/model/Workout'),
  routes = require('./api/routes/routes');

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', ()=> console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connect to DB succeed'));

app.use(express.json());
routes(app); //register the route
app.listen(PORT);
console.log('todo list RESTful API server started on: ' + PORT);