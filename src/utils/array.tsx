class ArrayClass extends Array {
  attributesFromResults(results: any[]) {
    const propertiesArray: string[] = [];

    // Iterate through each result object
    results.forEach((item) => {
      // Get the keys (property names) of the object and add them to propertiesArray
      const keys = Object.keys(item);
      propertiesArray.push(...keys);
    });

    return Array.from(new Set(propertiesArray));
  }
}

const array = new ArrayClass();

export default array;
