/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    ragRating: 'lime', // lime (green), yellow (amber), -red (red)
    tileShade: 'light',
    storyConfig: {
        width: '1',
        height: '1',
        scroll: false,
        viewOnly: true,
        editableFields: [
            { name: 'value', type: 'text', value: '', placeholder: 'Enter a value' },
            { name: 'description', type: 'text', value: '', placeholder: 'Enter a description' },
            { name: 'description2', type: 'text', value: '', placeholder: 'Enter a second description' },
            { name: 'rag', type: 'text', value: 'lime', placeholder: 'lime, yellow or red' }
        ]
    },
    
    // onRAG: function () {
    //     alert('colour:' + colour);
    //     var colour = this.get('storyModel.rag');
    //     this.set('storyConfig.colour', colour);
    // }.observes('storyModel.rag'),

    onInit: function () {
        this.get('storyModel');
        this.get('storyModel.config');
    }.on('init'),
});
