const ddb = require('../utils/DynamodbClient');
const IdeaRepository = require('./IdeaRepository');

const IDEA = require('../__fixtures__/idea');
const getIdea = require('../__fixtures__/item_idea');

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

describe('IdeaRepository', () => {
  describe('findTop5', () => {
    const idea = getIdea(Date.now(), {
      who: '프로그래머',
      what: '맛있는 라면',
    });

    beforeEach(() => {
      mockQuery(idea);
    });

    it('returns top 5 ideas', async () => {
      const items = await IdeaRepository.findTop5();

      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(idea);
    });
  });

  describe('saveIdea', () => {
    beforeEach(() => {
      ddb.put.mockClear();
      ddb.put.mockReturnValue({
        promise: async () => ({}),
      });
    });

    it('saves idea', async () => {
      await IdeaRepository.saveIdea(IDEA);

      expect(ddb.put).toBeCalled();
    });
  });
});
