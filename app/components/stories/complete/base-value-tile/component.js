/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: 'white',
    tileShade: Ember.computed.alias('storyModel.rag'),
    // tileShade: '',
    storyModel: null,
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

    onDidReceiveAttrs: function () {
        this.get('storyModel');
        this.get('storyModel.config');
    }.on('init'),
});