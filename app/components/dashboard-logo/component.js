import Ember from 'ember';

export default Ember.Component.extend({
    logoClass: Ember.computed('appController.solomonConfig', function () {
        return this.get('appController.solomonConfig.name') + '-logo';
    }),

    logoText: Ember.computed('appController.solomonConfig', function () {
        return this.get('appController.solomonConfig.title');
    }),

    click: function () {
        this.sendAction('action',this.get('actionParam'));
    }
});
