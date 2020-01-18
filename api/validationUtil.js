const Joi = require('joi'); //used for validation

exports.createSchema = Joi.object({
  author: Joi.string().min(3).required(),
  text: Joi.string().min(1).required()
})

exports.updateSchema = Joi.object({
  id: Joi.string().required(),
  text: Joi.string().min(1).required()
})

exports.validate = function(body, schema) {
  schema.validate(body).error;
}
