const respond = (statusCode, body) => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  statusCode,
  body: JSON.stringify(body, null, 2),
});

const hello = async (event) => {
  const body = {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  };

  return respond(200, body);
};

module.exports = { hello };
