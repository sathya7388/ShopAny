import _ from 'lodash';
import homeData from '../homeData';

export const contains = ({name}, query) => {
  if (name.toLowerCase ().includes (query)) {
    return true;
  }
  return false;
};

export const getVendor = (limit, query) => {
  return new Promise ((resolve, reject) => {
    if (query.length === 0) {
      resolve (_.take (homeData, limit));
    } else {
      const formattedQuery = query.toLowerCase ();
      const results = _.filter (homeData, vendor => {
        return contains (vendor, formattedQuery);
      });
      resolve (_.take (results, limit));
    }
  });
};

export default getVendor;
