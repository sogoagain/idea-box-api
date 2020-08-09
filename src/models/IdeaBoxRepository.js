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
      FilterExpression: 'active = :active',
      ExpressionAttributeNames: {
        "#category": "category",
        "#uuid": "uuid",
        "#active": "active",
      },
      ExpressionAttributeValues: {
        ":category": category,
        ":uuid": uuid,
        ":active": true,
      },
      Limit: 1,
    }).promise();

    if (Items.length !== 0) {
      return Items[0];
    }
  }
};

const findByCategoryAndText = async (category, text) => {
  const { Items } = await ddb.query({
    TableName: process.env.DYANMODB_TABLE,
    KeyConditionExpression: "#category = :category",
    FilterExpression: '#text = :text',
    ExpressionAttributeNames: {
      "#category": "category",
      "#text": "text",
    },
    ExpressionAttributeValues: {
      ":category": category,
      ":text": text,
    },
    Limit: 1,
  }).promise();

  if (Items.length !== 0) {
    return Items[0];
  }
};

const saveItem = async (category, text) => {
  await ddb.put({
    TableName: process.env.DYANMODB_TABLE,
    Item: {
      category,
      uuid: uuidv4(),
      text,
      active: false,
    },
  }).promise();
}

module.exports = {
  findRandomByCategory, findByCategoryAndText, saveItem,
};
