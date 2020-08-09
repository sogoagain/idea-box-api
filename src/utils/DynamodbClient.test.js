const ddb = require('./DynamodbClient');

const WHO = require('../__fixtures__/item_who');

describe('DynamodbClient', () => {
  beforeEach(async () => {
    await ddb.put({
      TableName: process.env.DYANMODB_TABLE,
      Item: WHO,
    }).promise();
  });

  it('query by key condition', async () => {
    const { Items } = await ddb.query({
      TableName: process.env.DYANMODB_TABLE,
      KeyConditionExpression: "#category = :category AND #identifier > :identifier",
      FilterExpression: '#active = :active',
      ExpressionAttributeNames: {
        "#category": "category",
        "#identifier": "identifier",
        "#active": "active",
      },
      ExpressionAttributeValues: {
        ":category": WHO.category,
        ":identifier": '6aa3c8c3-372b-436c-a421-3ada7ddda723',
        ":active": true,
      },
      Limit: 1,
    }).promise();

    expect(Items[0]).toEqual(WHO);
  });

  it('query by category and text', async () => {
    const { Items } = await ddb.query({
      TableName: process.env.DYANMODB_TABLE,
      KeyConditionExpression: "#category = :category",
      FilterExpression: '#text = :text',
      ExpressionAttributeNames: {
        "#category": "category",
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":category": WHO.category,
        ":text": WHO.text,
      },
      Limit: 1,
    }).promise();

    expect(Items[0]).toEqual(WHO);
  });
});
