import Ember from 'ember';

export function numberThousandFormat(params/*, hash*/) {
  //taken from: http://blog.tompawlak.org/number-currency-formatting-javascript
  return params.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export default Ember.Helper.helper(numberThousandFormat);