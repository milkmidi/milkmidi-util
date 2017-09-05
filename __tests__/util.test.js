
const {
  toCommaNumber,
  isNumber,
  queryString,
} = require('../dist/util');

describe('util', () => {
  test('queryString', () => {
    // expect(isNumber(0)).toBe(true);
  });
  test('isNumber', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(10)).toBe(true);
    expect(isNumber(100)).toBe(true);
    expect(isNumber('milkmidi')).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });

  test('toCommaNumber', () => {
    expect(toCommaNumber(999)).toBe('999');
    expect(toCommaNumber(123456789)).toBe('123,456,789');
    expect(toCommaNumber(12345678)).toBe('12,345,678');
    expect(toCommaNumber(-98765)).toBe('-98,765');
    expect(toCommaNumber(1234.5678)).toBe('1,234.5678');
    expect(toCommaNumber('milkmidi')).toBe('');
    expect(toCommaNumber([])).toBe('');
    expect(toCommaNumber({})).toBe('');
    expect(toCommaNumber(() => {})).toBe('');
  });
});
