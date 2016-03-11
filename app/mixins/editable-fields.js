import Ember from 'ember';

export default Ember.Mixin.create({

    fetchEditableFieldValue: function(name){
        const config = this.get('storyModel.config');
        if(!config) return '';
        const item = config.findBy('name', name);

        return item ? item.get('value') : '';
    },

    setupEditableFields: function (){
        var story = this.get('storyModel');
        if(!story) return;
        var config = this.get('editableFields') || [];

        if(story.get('config.length') > 0)
            return;

        config.forEach(function(object){
          story.addConfigItem(object);
        });
    }.on('init').observes('storyModel')

});
