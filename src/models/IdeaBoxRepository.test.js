const ddb = require('../utils/DynamodbClient');
const IdeaBoxRepository = require('../models/IdeaBoxRepository');

const WHO = require('../__fixtures__/who');

jest.mock('../utils/DynamoDbClient');

const mockQuery = (data) => {
  ddb.query.mockClear();
  ddb.query.mockReturnValue({
    promise: async () => {
      return {
        Items: [data],
      }
    },
  });
}

describe('IdeaBoxRepository', () => {
  describe('findRandomByCategory', () => {
    beforeEach(() => {
      mockQuery(WHO);
    });

    it('returns random idea by category', async () => {
      const idea = await IdeaBoxRepository.findRandomByCategory('who');

      expect(idea).toEqual({
        category: 'who',
        uuid: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
        text: '프로그래머',
      })
    });
  });
});
