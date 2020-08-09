const { getRandomIdea, getRecentIdeas, createIdea, createItems } = require('./IdeaBoxService');
const { findRandomByCategory, findByCategoryAndText, saveItem } = require('../models/ItemRepository');
const { findTop5, saveIdea } = require('../models/IdeaRepository');

const IDEA = require('../__fixtures__/idea');
const getIdea = require('../__fixtures__/item_idea');

jest.mock('../models/ItemRepository');
jest.mock('../models/IdeaRepository');

describe('IdeaBoxService', () => {
  describe('getRandomIdea', () => {
    beforeEach(() => {
      findRandomByCategory.mockClear();
      findRandomByCategory.mockImplementation(async (category) => ({
        category,
        identifier: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
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

  describe('getRecentIdeas', () => {
    beforeEach(() => {
      const ideas = [];
      for (let i = 0; i < 5; i++) {
        const idea = getIdea(Date.now() + i * 100, {
          who: `프로그래머${i}`,
          what: `맛있는 라면${i}`,
        });
        ideas.push(idea);
      }
      findTop5.mockClear();
      findTop5.mockResolvedValue(ideas);
    });

    it('returns recent ideas', async () => {
      const ideas = await getRecentIdeas();

      expect(ideas[0]).toEqual({
        who: "프로그래머0",
        what: "맛있는 라면0",
      });
      expect(ideas).toHaveLength(5);
    });
  });

  describe('createIdea', () => {
    beforeEach(() => {
      saveIdea.mockClear();
    })

    it('creates idea', async () => {
      await createIdea(IDEA);

      expect(saveIdea).toBeCalled();
    });
  });

  describe('createItems', () => {
    beforeEach(() => {
      findByCategoryAndText.mockClear();
      saveItem.mockClear();
    })

    context('when already exists', () => {
      beforeEach(() => {
        findByCategoryAndText.mockImplementation(async (category, text) => ({
          category,
          identifier: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
          text: text,
        }));
      });

      it('doesn\'t create items', async () => {
        await createItems(IDEA);

        expect(saveItem).not.toBeCalled();
      });
    });

    context('when already exists', () => {
      beforeEach(() => {
        findByCategoryAndText.mockResolvedValue(undefined);
      });

      it('creates items', async () => {
        await createItems(IDEA);

        expect(saveItem).toBeCalledTimes(2);
      });
    });
  });
});
