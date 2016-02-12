import Ember from 'ember';

export default Ember.Component.extend({
    
    isText: Ember.computed('field.type',{
        get() {
            return this.get('field.type') === 'text';
        }
    }),
    isSelect: Ember.computed('field.type',{
        get() {
            return this.get('field.type') === 'select';
        }
    }),
    content: Ember.computed('field.contentPath',{
        get(){
            var fieldContentPath = this.get('field.contentPath');
            var content = Ember.isEmpty(fieldContentPath) ? null : this.get(fieldContentPath);
            content.forEach(function(item){
                item.id = item._id;
            });
            return content;
        }
    })
});
