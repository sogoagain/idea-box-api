const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const config = {
  convertEmptyValues: true,
  region: process.env.API_AWS_REGION,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
};

module.exports = new DocumentClient(config);
