import Ember from 'ember';

export function statnoticeTypeIcon(params/*, hash*/) {
    if(params != null){
      return 'svg-stat-notices-icon-' + params[0].toLowerCase() + (params[1] != null ? params[1] : '');      
    }
}

export default Ember.HTMLBars.makeBoundHelper(statnoticeTypeIcon);