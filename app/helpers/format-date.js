import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  if(params != null){
    if(params.length > 1) {
      if(isNaN(Date.parse(params[1]))){
        return ""; // invalid date passed
      } else {
        return moment(new Date(params[1])).format(params[0]); // passed date, passed format
      }      
    } else {
      return moment().format(params[0]); // current date, passed format
    }
  }
  return moment().format('ll'); // return current date, default format
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
