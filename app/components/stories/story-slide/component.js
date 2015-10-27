import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNames: ['slide'],
    attributeBindings: 'cpn-story_carousel-item',
    width: Ember.computed.alias('target.width'),
    'cpn-story_carousel-item': Ember.computed(function() {
        return 'width-' + this.get('width');
    })
});
