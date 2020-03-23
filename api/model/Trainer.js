'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  kind: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trainers', TrainerSchema);