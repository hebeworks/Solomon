/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    color: 'white',
    // _tileValue: null,
    // tileValue: Ember.computed('storyModel.config.@each', {
    //     get() {
    //         return this.get('storyModel.config')
    //             .find(function (item, index, self) {
    //                 return item.get('name') == 'value';
    //             }).get('value');
    //     }
    // }),
    // tileDesc1: Ember.computed('storyModel.config.@each', {
    //     get() {
    //         return this.get('storyModel.config')
    //             .find(function (item, index, self) {
    //                 return item.get('name') == 'description';
    //             }).get('value');
    //     }
    // }),
    // tileDesc2: Ember.computed('storyModel.config.@each', {
    //     get() {
    //         return this.get('storyModel.config')
    //             .find(function (item, index, self) {
    //                 return item.get('name') == 'description2';
    //             }).get('value');
    //     }
    // }),

    // onStoryModelConfig: function () {
    //     alert('onStoryModelConfig');
    //     var _this = this;
    //     var editableFields = this.get('storyConfig.editableFields'); // get this components editable fields
    //     if (!Ember.isEmpty(editableFields)) {
    //         var config = this.get('storyModel.config'); // load the config fields from the story model
    //         if (!Ember.isEmpty(config)) {
    //             config.forEach(function (item) { // for each config field in the story model
    //                 if (editableFields.any(function (obj) { // if this field exists in the component's editable fields
    //                     return obj.name == item.get('name'); 
    //                 })) {
    //                     _this.set(item.get('name'), item.get('value')); // set a property on this component equal to the value from the story model config
    //                 }
    //             });
    //         }
    //     }
    // }.observes('storyModel.config.@each'),
    
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
        // this.onStoryModelConfig();
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
