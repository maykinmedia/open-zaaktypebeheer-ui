import { ZaaktypeT } from '../types/types';
import compare from './compare';

class Filter {
  onQuery(query: string, array: string[]) {
    return array.filter((item) => {
      return compare.partString(item, query);
    });
  }

  attributeOnQuery(query: string, data: ZaaktypeT[], attribute: keyof ZaaktypeT) {
    if (!data) return data;
    return data.filter((dataItem) => {
      let valueFromAttribute = dataItem[attribute];
      if (typeof valueFromAttribute === 'string')
        return compare.partString(valueFromAttribute, query);
    });
  }
}

const filter = new Filter();

export default filter;
