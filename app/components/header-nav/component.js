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
    

    logoClass: Ember.computed(appController.siteConfig, function() {
        // return 'solomon-logo';
        // return 'lcd-logo';
        
        return appController.siteConfig.name;
    }),
    
    logoText: Ember.computed(appController.siteConfig, function() {
        // return 'Solomon';
        // return 'Leeds City Dashboard';
        
        return appController.siteConfig.title;
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
