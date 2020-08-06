const { hello } = require('./IdeaBoxController');

describe('IdeaBoxController', () => {
  describe('hello', () => {
    it('returns hello', async () => {
      const response = await hello(jest.fn());

      expect(response.body).toContain('Go Serverless v1.0! Your function executed successfully!');
    });
  });
});