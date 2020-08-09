const { validCategory, validLength } = require('./Validation');

describe('Validation', () => {
  describe('validCategory', () => {
    context('when valid', () => {
      it('returns true', () => {
        const result = validCategory('who');

        expect(result).toBeTruthy();
      });
    })

    context('when invalid', () => {
      it('throws invalidInputError', () => {
        expect(() => {
          validCategory('when');
        }).toThrow(/category is not valid/);
      });
    });
  });

  describe('validLength', () => {
    context('when valid', () => {
      it('returns true', () => {
        const result = validLength('프로그래머', 5);

        expect(result).toBeTruthy();
      })
    })

    context('when invalid', () => {
      it('throws invalidInputError', () => {
        expect(() => {
          validLength('프로그래머', 4);
        }).toThrow('value is too long (maximum is 4 characters)');
      });
    });
  });
});
