/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Leeds City Council');
        this.set('subTitle', 'Statement of Accounts 2014/15');
        var obj = this;
    }
});
