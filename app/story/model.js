import DS from 'ember-data';
import Ember from 'ember';

var story = DS.Model.extend({
    title: DS.attr('string'),
    storyType: DS.attr('string'),
    componentPath: Ember.computed('storyType',{
        get(){
            if(!Ember.isEmpty(this.get('storyType'))) {
                return this.get('storyType').toString().ensureStartingString('stories/complete/');
            }
            return "";
        }
    }),
    
    categories: DS.hasMany('category',{ async: true }),
    canvasOrderIndex: DS.attr('number'),

    configJSON: DS.attr('string'),
    _config:null,
    config: function(){
        if(this.get('_config') == null && this.get('configJSON') != null) {
            var json = this.get('configJSON');
            var config = JSON.parse(json);
            this.set('_config', config)
        }
        return this.get('_config');
    }.property(),
    
});

export default story;