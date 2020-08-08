const { getRandomIdea } = require('./IdeaBoxService');
const { findRandomByCategory } = require('../models/IdeaBoxRepository');

jest.mock('../models/IdeaBoxRepository');

describe('IdeaBoxService', () => {
  describe('getRandomIdea', () => {
    beforeEach(() => {
      findRandomByCategory.mockClear();
      findRandomByCategory.mockImplementation(async (category) => ({
        category,
        uuid: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
        text: category,
      }));
    });

    it('returns random idea', async () => {
      const idea = await getRandomIdea();

      expect(idea).toEqual({
        who: 'who',
        what: 'what',
      });
    });
  });
});