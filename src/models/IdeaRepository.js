const ddb = require('../utils/DynamodbClient');

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

module.exports = { saveIdea };
