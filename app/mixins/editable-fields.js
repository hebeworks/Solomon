import Ember from 'ember';

export default Ember.Mixin.create({

    fetchConfigurationValue: function(name){
        const config = this.get('storyModel.config');
        const item = config.findBy('name', name);

        return item ? item.get('value') : '';
    },

    setupEditableConfiguration: function (){
        var story = this.get('storyModel');
        var config = this.get('editableFields') || [];

        config.forEach(function(object){
          story.addConfigItem(object);
        });
    }.on('init')

});
