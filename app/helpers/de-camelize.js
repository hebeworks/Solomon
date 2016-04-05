import Ember from 'ember';

export function deCamelize(params/*, hash*/) {
  var str = params[0];
  var options = params[1];
  var separator = ' ';
  
  var words = str.split(/(?=[A-Z])/);
  for (var i = 0; i < words.length; i++) {
      if(options === 'capitalizeAllWords') {
          words[i] = s.capitalize(words[i].toLowerCase());
      } else {
          words[i] = words[i].toLowerCase();
      }
  }
  return words.join(separator);
}

export default Ember.Helper.helper(deCamelize);
