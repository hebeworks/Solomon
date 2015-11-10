import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  // return current date
  
  if(params != null){
    if(params.length > 1) {
      if(isNaN(Date.parse(params[1]))){
        return "";
      } else {
        return moment(new Date()).format(params[0]);
      }      
    } else {
      return moment().format(params[0]);
    }
  }
  return moment().format('ll');
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
