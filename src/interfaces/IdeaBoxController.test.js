const { hello, getIdea } = require('./IdeaBoxController');
const { getRandomIdea } = require('../applications/IdeaBoxService');

const IDEA = require('../__fixtures__/idea');

jest.mock('../applications/IdeaBoxService');

describe('IdeaBoxController', () => {
  describe('hello', () => {
    it('returns hello', async () => {
      const response = await hello(jest.fn());

      expect(response.body).toContain('Hello World');
    });
  });

  describe('getIdea', () => {
    beforeEach(() => {
      getRandomIdea.mockClear();
      getRandomIdea.mockResolvedValue(IDEA);
    });

    it('returns idea', async () => {
      const response = await getIdea(jest.fn());
      const body = JSON.parse(response.body);

      expect(body).toEqual(IDEA)
    });
  });
});