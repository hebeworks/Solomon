import Ember from 'ember';

export default Ember.View.extend({
        didInsertElement: function(){
            //called on creation
            this.$().hide().fadeIn(400);
        },
        willDestroyElement: function(){
            //called on destruction
            this.$().slideDown(250);
        }
});
