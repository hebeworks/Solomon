import Ember from 'ember';

export default Ember.Component.extend({
    showSubNav: false,

    siteTitle: function () {
        return 'Leeds Dashboard Title';
    }.property(),

    // onInit: function () {
    //     this.set('appController', this.controllerFor('Application'));
    // }.on('init'),

    topOpen: function () {
        return (this.get('appController.topOpen') ? '-open' : '');
    }.property('appController.topOpen'),

    logoClass: Ember.computed(function() {
        // return 'solomon-logo';
        return 'lcd-logo';
    }),
    
    logoText: Ember.computed(function() {
        // return 'Solomon';
        return 'Leeds City Dashboard';
    }),

    //actions: {
    //    gotoRoute:function(route){
    //        this.get('target').transitionTo(route);
    //    }
    //}



    // actions: {
    //     gotoRoute: function (route) {
    //         this.sendAction('action', route);
    //     },
    //     /*toggleSubNav : function(){
    //         this.$().addClass('subNav');
    //         this.set('showSubNav',true);
    //     }*/
    // }
});
