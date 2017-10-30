/* eslint no-useless-escape:off , max-len:off */
/**
 *@author milkmidi
 *@version 1.0.0
 */
const MOBILE_PATTERN = /^\d{10}$/;
const EMAIL_PATTERN = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const TW_ID_PATTERN = /^[A-Za-z]{1}(1|2)[0-9]{8}$/;
const TW_ID_MULTIPLY = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const TW_ID_MAP = { a: 10, b: 11, c: 12, d: 13, e: 14, f: 15, g: 16, h: 17, j: 18, k: 19, l: 20, m: 21, n: 22, p: 23, q: 24, r: 25, s: 26, t: 27, u: 28, v: 29, x: 30, y: 31, w: 32, z: 33, i: 34, o: 35 };

/**
 * @param {string} email
 * @return {boolean}
 */
export function isEmail(email) {
  return EMAIL_PATTERN.test(email);
}
/**
 * @param {string} mobileNumber
 * @return {boolean}
 */
export function isMobile(mobileNumber) {
  return MOBILE_PATTERN.test(mobileNumber.toString());
}
/**
 * Taiwan ID
 * @param {string} sID
 * @return {boolean}
 */
export function isIdentityInTaiwan(sID) {
  if (!TW_ID_PATTERN.test(sID)) {
    return false;
  }
  const firstLetter = sID.charAt(0).toLowerCase();
  const firstLetterToNumber = TW_ID_MAP[firstLetter];
  const lastNum = parseInt(sID.charAt(9), 10);
  const nums = [
    Math.floor(firstLetterToNumber / 10),
    firstLetterToNumber % 10,
  ];
  const sum = lastNum + TW_ID_MULTIPLY.reduce((accumulator, val, index) => {
    let n;
    if (index < 2) {
      n = nums[index];
    } else {
      n = parseInt(sID.charAt(index - 1), 10);
    }
    return (n * TW_ID_MULTIPLY[index]) + accumulator;
  }, 0);
  return sum % 10 === 0;
}
