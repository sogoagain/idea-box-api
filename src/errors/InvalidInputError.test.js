const InvalidInputError = require('./InvalidInputError');

test('InvalidInputError', () => {
  const statusCode = 403;
  const message = 'value is too long (maximum is 10 characters)';

  const error = new InvalidInputError(403, message);

  expect(error.statusCode).toBe(statusCode);
  expect(error.message).toBe(message);
});
