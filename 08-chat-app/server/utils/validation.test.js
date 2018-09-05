const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const someObject = {value: 'Hey'};
    const number = 42;

    expect(isRealString(someObject)).toBe(false);
    expect(isRealString(number)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const whiteString = '      ';

    expect(isRealString(whiteString)).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const okString = '  MyName  ';

    expect(isRealString(okString)).toBe(true);
  });
});