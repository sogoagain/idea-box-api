const ddb = require('./DynamodbClient');

const WHO = require('../__fixtures__/who');

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
      KeyConditionExpression: "#category = :category AND #uuid > :uuid",
      ExpressionAttributeNames: {
        "#category": "category",
        "#uuid": "uuid",
      },
      ExpressionAttributeValues: {
        ":category": WHO.category,
        ":uuid": '6aa3c8c3-372b-436c-a421-3ada7ddda723',
      },
      Limit: 1,
    }).promise();

    expect(Items[0]).toEqual(WHO);
  });
});