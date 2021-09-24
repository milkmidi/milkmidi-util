
const {
  isEmail,
  isMobile,
  isIdentityInTaiwan,
} = require('../lib/validate');

describe('validate', () => {
  test('email', () => {
    expect(isEmail('milkmidi@gmail.com')).toBe(true);
    expect(isEmail('milkmidi.m@gmail.com')).toBe(true);
    expect(isEmail('milkmidi+ab@gmail.com')).toBe(false);
  });
  test('isMobileNumber', () => {
    expect(isMobile('0912345678')).toBe(true);
    expect(isMobile('09123456789')).toBe(false);
    expect(isMobile('091234567')).toBe(false);
    expect(isMobile('a091234567')).toBe(false);
    expect(isMobile('ab091234567')).toBe(false);
  });
  test('isIdentityInTaiwan', () => {
    expect(isIdentityInTaiwan('a123456789')).toBe(true);
    expect(isIdentityInTaiwan('A142931314')).toBe(true);
    expect(isIdentityInTaiwan('A121104657')).toBe(true);
    expect(isIdentityInTaiwan('J144208432')).toBe(true);
    expect(isIdentityInTaiwan('J184577854')).toBe(true);

    expect(isIdentityInTaiwan('J1845778549')).toBe(false);
    expect(isIdentityInTaiwan('J184577855')).toBe(false);
    expect(isIdentityInTaiwan('J184577856')).toBe(false);
    expect(isIdentityInTaiwan('J184577857')).toBe(false);
    expect(isIdentityInTaiwan('J184577858')).toBe(false);
    expect(isIdentityInTaiwan('J184577859')).toBe(false);
    expect(isIdentityInTaiwan('Ja84577859')).toBe(false);
  });
});
