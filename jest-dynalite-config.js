module.exports = {
  tables: [
    {
      TableName: `IdeaBox`,
      KeySchema: [
        {
          AttributeName: 'category',
          KeyType: 'HASH' },
        {
          AttributeName: "uuid",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'category',
          AttributeType: 'S',
        },
        {
          AttributeName: 'uuid',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
};