/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: 'white',
    // tileValue: 'Value',
    _tileValue: null,
    tileValue: Ember.computed('storyModel.config.@each', {
        get() {
            
            return this.get('storyModel.config')
                .find(function (item, index, self){
                    return item.get('name') == 'value';
                }).get('value'); 
        }
    }),
    // tileDesc1: 'Description 1',
    // tileDesc2: 'Description 2',
    // tileShade: '',
    storyModel: null,

    storyConfig: {
        width: '1',
        height: '1',
        scroll: true,
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
    
    // onInserted: function () {
    //     var _this = this;
    //     var timer = setInterval(function () {
    //         var story = _this.get('storyModel');
    //         if (!Ember.isEmpty(story)) {
    //             _this.setupEditableFields();
    //             clearInterval(timer);
    //             _this.set('timer', null);
    //         }
    //         // var config = _this.get('storyModel.config');
    //     }, 1000);
    //     this.set('timer', timer);
    // }.on('didInsertElement'),
    
    // setupEditableFields: function () {
    //     var story = this.get('storyModel');
    //     story.addConfigItem({ name: 'value', type: 'text', value: '', placeholder: 'Enter a value' });
    //     story.addConfigItem({ name: 'description', type: 'text', value: '', placeholder: 'Enter a description' });
    //     story.addConfigItem({ name: 'description2', type: 'text', value: '', placeholder: 'Enter a second description' });
    // },

    // setupComplete: false,
    // onStoryModel: function () {
    //     debugger;
    //     if (!this.get('setupComplete')) {
    //         var storyModel = this.get('storyModel');
    //         if (!Ember.isEmpty(storyModel)) {
    //             this.setupEditableFields();
    //         }
    //     }
    // }.observes('storyModel'),
});
