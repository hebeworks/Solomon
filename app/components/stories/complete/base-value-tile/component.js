/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,

    tileValue: null,
    tileDesc1: null,
    tileDesc2: null,
    tileShade: '',
    tileUrl: '',

    initialConfig: {
        width: '1',
        height: '1',
        viewOnly: true,
        color: 'white'
    }
});
