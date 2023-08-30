/**
 * Create array from results attributes
 * @param data array of objects
 * @returns array of attributes
 */
export const attributesFromDataArray = (data: any[]) => {
  const propertiesArray: string[] = [];

  // Iterate through each object
  for (const obj of data) {
    const keys = Object.keys(obj);
    // Get the keys (property names) of the object and add them to propertiesArray
    propertiesArray.push(...keys);
  }
  return uniqueArray(propertiesArray);
};

/**
 * Return an unique array
 * @param array array to make unique
 * @returns unique array
 */
export const uniqueArray = (array: any[]) => Array.from(new Set(array));
