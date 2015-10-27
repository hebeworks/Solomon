import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNames: ['slide'],
    attributeBindings: 'cpn-story_carousel-item',
    'cpn-story_carousel-item': Ember.computed(function() {
        return 'width-' + this.get('width');
    })
});
