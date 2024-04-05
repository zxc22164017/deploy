const joi = require("joi");

const registerValid = (data) => {
  const Schema = joi.object({
    username: joi.string().max(50).required(),
    email: joi.string().min(10).required().email(),
    password: joi.string().min(8).max(50).required(),
    gender: joi.string().required().valid("male", "female", "other"),
  });

  return Schema.validate(data);
};

const loginValid = (data) => {
  const Schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().max(50).required(),
  });

  return Schema.validate(data);
};

const picValid = (data) => {
  const Schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
  });
  return Schema.validate(data);
};

const comValid = (data) => {
  const Schema = joi.object({
    comment: joi.string().required(),
  });
  return Schema.validate(data);
};

module.exports.registerValid = registerValid;
module.exports.loginValid = loginValid;
module.exports.picValid = picValid;
module.exports.comValid = comValid;
