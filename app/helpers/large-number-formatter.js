import Ember from 'ember';

export function largeNumberFormatter(params/*, hash*/) {
  // params[0] = number
  
  function formatLargeNumbers(rep) {
    rep = rep + ''; // coerce to string
    if (rep < 1000) {
      return rep; // return the same number
    }
    if (rep < 10000) { // place a comma between
      return rep.charAt(0) + ',' + rep.substring(1);
    }
    if (rep < 1000000) { // display thousands with k
      // divide and format
      return (rep / 1000).toFixed(rep % 1000 != 0) + 'k';
    }
    return (rep / 1000000).toFixed((rep % 1000000 != 0 ? 2 : 0)) + 'm';
  };

  var num = params[0];
  if (num) {
    return formatLargeNumbers(num);
  }
  return "";
}

export default Ember.Helper.helper(largeNumberFormatter);
