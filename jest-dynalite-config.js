module.exports = {
  tables: [
    {
      TableName: `IdeaBox`,
      KeySchema: [
        {
          AttributeName: 'category',
          KeyType: 'HASH' },
        {
          AttributeName: "identifier",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'category',
          AttributeType: 'S',
        },
        {
          AttributeName: 'identifier',
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