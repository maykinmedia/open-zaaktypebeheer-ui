import decamelize from 'decamelize';

/**
 * Uppercase the first letter of a string.
 * @param string the string of which the first letter should be capitalized
 * @returns the string with the first letter capitalized
 */
export const ucFirstText = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Decamelize a string.
 * @param string the string to decamelize
 * @param noUcFirst if true, the first letter will not be capitalized
 * @param separator the separator to use, defaults to a space
 * @returns the decamelized string
 */
export const decamelizeText = (string: string, noUcFirst?: true, separator?: string) => {
  if (!noUcFirst)
    return ucFirstText(decamelize(string, { separator: separator ? separator : ' ' }));
  return decamelize(string, { separator: separator });
};

/**
 * Calculate the width of a string, based on the number of characters and the ~width of a character.
 * @param string The string to calculate the width of
 * @param xWidth The width of a character
 * @param baseSize The base size to calculate the string from
 * @returns a number representing the width of the string
 */
export const widthText = (string: string, xWidth: number, baseSize: number = 30) => {
  return baseSize + Array.from(string).length * xWidth;
};
