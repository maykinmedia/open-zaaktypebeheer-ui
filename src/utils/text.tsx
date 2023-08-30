import decamelize from 'decamelize';

class Text {
  ucFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  decamelize(str: string, noUcFirst?: true, separator?: string) {
    if (!noUcFirst)
      return this.ucFirst(decamelize(str, { separator: separator ? separator : ' ' }));
    return decamelize(str, { separator: separator });
  }
}

const text = new Text();

export default text;
