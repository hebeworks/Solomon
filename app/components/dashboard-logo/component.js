import Ember from 'ember';

export default Ember.Component.extend({
    logoClass: Ember.computed('appController.siteConfig', function () {
        return this.get('appController.siteConfig.name') + '-logo';
    }),

    logoText: Ember.computed('appController.siteConfig', function () {
        return this.get('appController.siteConfig.title');
    }),

    click: function () {
        this.sendAction('action',this.get('actionParam'));
    }
});
