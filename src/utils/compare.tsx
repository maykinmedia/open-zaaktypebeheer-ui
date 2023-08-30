class Compare {
  partString(str1: string, str2: string) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  exactString(str1: string, str2: string) {
    return str1.toLowerCase() === str2.toLowerCase();
  }
}

const compare = new Compare();
export default compare;
