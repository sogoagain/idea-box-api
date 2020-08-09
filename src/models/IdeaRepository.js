const ddb = require('../utils/DynamodbClient');

const findTop5 = async () => {
  const { Items } = await ddb.query({
    TableName: process.env.DYANMODB_TABLE,
    KeyConditionExpression: "#category = :category",
    ExpressionAttributeNames: {
      "#category": "category",
    },
    ExpressionAttributeValues: {
      ":category": 'idea',
    },
    ScanIndexForward: false,
    Limit: 5,
  }).promise();

  return Items;
};

const saveIdea = async ({ who, what }) => {
  const idea = {
    category: 'idea',
    identifier: Date.now().toString(),
    who,
    what,
  };

  await ddb.put({
    TableName: process.env.DYANMODB_TABLE,
    Item: idea,
  }).promise();
};

module.exports = { findTop5, saveIdea };
