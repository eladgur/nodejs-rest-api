'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  author: String,
  text: String,
  votes: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Posts', PostSchema);