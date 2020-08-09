const ddb = require('../utils/DynamodbClient');
const ItemRepository = require('./ItemRepository');

const WHO = require('../__fixtures__/item_who');

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

describe('ItemRepository', () => {
  describe('findRandomByCategory', () => {
    beforeEach(() => {
      mockQuery(WHO);
    });

    it('returns random item by category', async () => {
      const item = await ItemRepository.findRandomByCategory('who');

      expect(item).toEqual({
        category: 'who',
        identifier: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
        text: '프로그래머',
        active: true,
      })
    });
  });

  describe('findByCategoryAndText', () => {
    beforeEach(() => {
      mockQuery(WHO);
    });

    it('returns item by category and text', async () => {
      const item = await ItemRepository.findByCategoryAndText('who', '프로그래머');

      expect(item).toEqual({
        category: 'who',
        identifier: '6aa3c8c3-372b-436c-a421-3ada7ddda724',
        text: '프로그래머',
        active: true,
      })
    });
  });

  describe('saveItem', () => {
    beforeEach(() => {
      ddb.put.mockClear();
      ddb.put.mockReturnValue({
        promise: async () => ({}),
      });
    });

    it('saves item', async () => {
      await ItemRepository.saveItem('who', '프로그래머');

      expect(ddb.put).toBeCalled();
    });
  });
});
