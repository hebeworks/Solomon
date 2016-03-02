import Ember from 'ember';
import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ManipulationPanelContent, {
    message: '',
    isSaving: false,

    onInserted: function () {
        this.set('isSaving', false);
    }.on('didInsertElement'),

    editableFields: function () {
        return this.get('model.config');
    }.property('model'),

    editableFieldAttributes: function () {
        return {};
    }.property('model'),

    mainTitle: Ember.computed(function () {
        return 'Edit Story: ' + this.get('model.title');
    }),

    storeEditableFieldValues: function () {
        const fields = this.get('editableFields');

        if (!fields)
            return;

        fields.forEach(function (field) {
            this.set('editableFieldAttributes.' + field.get('name'), field.get('value'))
        }.bind(this));
    }.on('init').observes('model'),

    restoreEditableFieldValues: function () {
        const fields = this.get('editableFields');

        if (!fields)
            return;

        fields.forEach(function (field) {
            field.set('value', this.get('editableFieldAttributes.' + field.get('name')));
        }.bind(this));
    },

    save: function () {
        this.set('isSaving', true);
        this.set('action', 'saveCanvasState');
        this.sendAction('action');
    },

    onIsClosing: function () {
        if (!this.get('isSaving') && this.get('isClosing')) {
            this.restoreEditableFieldValues();
        }
        if (this.get('isSaving') === true) {
            this.set('isSaving', false);
        }
    }.observes('isClosing'),

    actions: {
        save: function () {
            this.save();
            this.send('close');
        },
        cancel: function () {
            this.restoreEditableFieldValues();
            this.send('close');
        },
        close: function () {
            this.set('action', 'closeManipulationPanel');
            this.sendAction('action');
        }
    }
});
