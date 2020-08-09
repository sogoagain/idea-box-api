const { hello, getIdea, postIdea, postIdeaItems } = require('./IdeaBoxController');
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

      expect(response.statusCode).toBe(200);
      expect(body).toEqual(IDEA)
    });
  });

  describe('postIdea', () => {
    context('with valid request', () => {
      it('returns 201 created', async () => {
        const event = {
          body: JSON.stringify(IDEA),
        }
        const response = await postIdea(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(201);
        expect(body).toEqual({})
      });
    });

    context('with invalid category', () => {
      it('returns 400 bad request', async () => {
        const event = {
          body: JSON.stringify({
            when: '비가 올 때',
          }),
        }
        const response = await postIdea(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(400);
        expect(body).toBe('category is not valid');
      });
    });

    context('with invalid value', () => {
      it('returns 403 invalid format', async () => {
        const event = {
          body: JSON.stringify({
            who: '입력값이 너무 길면 403을 반환합니다.',
          }),
        }
        const response = await postIdea(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(403);
        expect(body).toBe('value is too long (maximum is 10 characters)');
      });
    });
  });

  describe('postIdeaItems', () => {
    context('with valid request', () => {
      it('returns 201 created', async () => {
        const event = {
          body: JSON.stringify(IDEA),
        }
        const response = await postIdeaItems(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(201);
        expect(body).toEqual({})
      });
    });

    context('with invalid category', () => {
      it('returns 400 bad request', async () => {
        const event = {
          body: JSON.stringify({
            when: '비가 올 때',
          }),
        }
        const response = await postIdeaItems(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(400);
        expect(body).toBe('category is not valid');
      });
    });

    context('with invalid value', () => {
      it('returns 403 invalid format', async () => {
        const event = {
          body: JSON.stringify({
            who: '입력값이 너무 길면 403을 반환합니다.',
          }),
        }
        const response = await postIdeaItems(event);
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(403);
        expect(body).toBe('value is too long (maximum is 10 characters)');
      });
    });
  });
});
