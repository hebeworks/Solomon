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
    content: Ember.computed('field.content',{
        get(){
            var fieldContentPath = this.get('field.contentPath');
            return Ember.isEmpty(fieldContentPath) ? null : this.get(fieldContentPath);
        }
    })
});
