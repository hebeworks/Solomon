import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    attributeBindings: 'cpn-story_carousel-item',

    received: function () {
        var width = this.get('target.storyConfig.width');
        this.set('width', width);
    }.on('didReceiveAttrs'),

    'cpn-story_carousel-item': Ember.computed(function () {
        return 'width-' + this.get('width');
    })
});
