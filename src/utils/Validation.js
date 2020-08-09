const InvalidInputError = require('../errors/InvalidInputError');

const validCategory = (category) => {
  if (!['who', 'what'].includes(category)) {
    throw new InvalidInputError(400, 'category is not valid');
  }
  return true;
};

const validLength = (value, maxLength) => {
  if (value.length > maxLength) {
    throw new InvalidInputError(403, `value is too long (maximum is ${maxLength} characters)`);
  }
  return true;
};

module.exports = { validCategory, validLength };
