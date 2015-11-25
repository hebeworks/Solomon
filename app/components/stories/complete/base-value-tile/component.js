/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    color: 'white',
    // tileShade: Ember.computed.alias('storyModel.rag'),
    // tileShade: '',

    storyConfig: {
        // title=''
        // subTitle=''
        // color=color
        // width="1"
        // height="1"
        // data-ss-colspan="1"
        // viewOnly=true
        width: '1',
        height: '1',
        scroll: false,
        viewOnly: true,
        editableFields: [
            { name: 'value', type: 'text', value: '', placeholder: 'Enter a value' },
            { name: 'description', type: 'text', value: '', placeholder: 'Enter a description' },
            { name: 'description2', type: 'text', value: '', placeholder: 'Enter a second description' }
        ]
    },

    // onDidReceiveAttrs: function () {
    //     this.get('storyModel');
    //     this.get('storyModel.config');
    // }.on('init'),
});