import Ember from 'ember';

export default Ember.Component.extend({
    logoClass: Ember.computed('appSettings.solomonConfig', function () {
        return this.get('appSettings.solomonConfig.name') + '-logo';
    }),

    logoText: Ember.computed.alias('appSettings.solomonConfig.title'),
    
    svgLogo: Ember.computed('appSettings.logoType', function() {
        if (this.get('appSettings.logoType') == 'svg') {
            return true;
        } else {
            return false;
        }
    }),

    click: function () {
        this.sendAction('action',this.get('actionParam'));
    }
});
