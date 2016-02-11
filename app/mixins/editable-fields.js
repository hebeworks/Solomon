import Ember from 'ember';

export default Ember.Mixin.create({

    fetchEditableFieldValue: function(name){
        const config = this.get('storyModel.config');
        const item = config.findBy('name', name);

        return item ? item.get('value') : '';
    },

    setupEditableFields: function (){
        var story = this.get('storyModel');
        var config = this.get('editableFields') || [];

        if(story.get('config.length') > 0)
            return;

        config.forEach(function(object){
          story.addConfigItem(object);
        });
    }.on('init')

});
