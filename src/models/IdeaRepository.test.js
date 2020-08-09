const ddb = require('../utils/DynamodbClient');
const IdeaRepository = require('./IdeaRepository');

const IDEA = require('../__fixtures__/idea');

jest.mock('../utils/DynamoDbClient');

describe('IdeaRepository', () => {
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
