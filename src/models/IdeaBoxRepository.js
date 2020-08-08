const { v4: uuidv4 } = require('uuid');

const ddb = require('../utils/DynamodbClient');

const findRandomByCategory = async (category) => {
  const uuid = uuidv4();
  const keyConditions = [
    '#category = :category AND #uuid > :uuid',
    '#category = :category AND #uuid <= :uuid',
  ];

  for (const condition of keyConditions) {
    const { Items } = await ddb.query({
      TableName: process.env.DYANMODB_TABLE,
      KeyConditionExpression: condition,
      ExpressionAttributeNames: {
        "#category": "category",
        "#uuid": "uuid",
      },
      ExpressionAttributeValues: {
        ":category": category,
        ":uuid": uuid,
      },
      Limit: 1,
    }).promise();

    if (Items.length !== 0) {
      return Items[0];
    }
  }
};

module.exports = {
  findRandomByCategory,
};
