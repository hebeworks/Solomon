import Ember from 'ember';

export function numberThousandFormat(params/*, hash*/) {
  // params[0] = number
  // params[1] = bool to shorten using "k"
  //taken from: http://blog.tompawlak.org/number-currency-formatting-javascript
  var num = params[0];
  if(num){
    if(params[1]) {
      return num > 999 ? addCommas((num/1000).toFixed(0)) + 'k' : num;
    }
    return addCommas(num);
  }
  return "";
}

function addCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export default Ember.Helper.helper(numberThousandFormat);