const respond = (statusCode, body) => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  statusCode,
  body: JSON.stringify(body, null, 2),
});

const error = (err) => {
  if (!err.statusCode) {
    return respond(500, err.message);
  }
  return respond(err.statusCode, err.message);
}

module.exports = { respond, error };