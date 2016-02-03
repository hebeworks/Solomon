import Ember from 'ember';

export default Ember.Object.extend({

  isAdmin: function(){
    return false;
  }.property()

});
