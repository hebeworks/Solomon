import Ember from 'ember';

export default Ember.Component.extend({

    isText: Ember.computed('field.type', {
        get() {
            return this.get('field.type') === 'text';
        }
    }),
    isSelect: Ember.computed('field.type', {
        get() {
            return this.get('field.type') === 'select';
        }
    }),
    isMarkdown: Ember.computed('field.type', {
        get() {
            return this.get('field.type') === 'markdown';
        }
    }),
    isEnum: Ember.computed('field.type', {
        get() {
            return this.get('field.type') === 'enum';
        }
    }),
    content: Ember.computed('field.contentPath','field.sourceContent', {
        get() {
            var content = null;
            if (this.get('isEnum')) {
                var fieldContent = this.get('field.sourceContent');
                var parsed = JSON.parse(fieldContent);
                if(Ember.isArray(parsed)) {
                    content = parsed;
                }
            } else if (this.get('isSelect')) {
                var fieldContentPath = this.get('field.contentPath');
                content = Ember.isEmpty(fieldContentPath) ? null : fieldContentPath;
                content.forEach(function (item) {
                    item.id = item.id;
                });
            }
            return content;
        }
    })
});
