/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    layoutName: 'components/stories/complete/base-rag-tile',
    loaded: false,
    currentValue: null,
    previousValue: null,
    previousPeriod: null,
    trend: null, // up, down
    longText: null,
    shortText: null,
    linkText: 'Press to see more',
    linkURL: null,
    lineShade: 'light', // light, dark
    rating: 'neutral', // good, bad, neutral

    storyConfig: {
        width: '1',
        height: '1',
        viewOnly: true,
        color: 'amber'
    },
    
    onInit: function() {
        this.get('rating');
        this.get('loaded');
        this.get('trend');
    }.on('init'),
    
    onRating: function() {
        if (this.rating == 'good') {
            this.set('storyConfig.color','lime');
        } else if (this.rating == 'bad') {
            this.set('storyConfig.color','red');
        } else {
            this.set('storyConfig.color','amber');
        }
    }.observes('rating')
});
