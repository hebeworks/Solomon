import Ember from 'ember';

import ManipulationPanelContent from 'hebe-dash/mixins/manipulation-panel-content';

export default Ember.Component.extend(ManipulationPanelContent, {

    canvas: null,
    message: '',

    categories: function () {
        return [];
    }.property('model'),

    stories: function () {
        return [];
    }.property('model'),

    onModelChanged: function () {
        this.setProperties({
            title: this.get('model.title') || '',
            description: this.get('model.description') || '',
            stories: this.get('model.stories') || Ember.A(),
            author: this.get('model.author') || '',
            twitter: this.get('model.twitter') || ''
        });
        // categories: model.get('categories')
    }.observes('model').on('didReceiveAttrs'),

    allCategories: Ember.computed({
        get() {
            return this.store.query('category', {})
        }
    }),

    allStories: Ember.computed({
        get() {
            return this.store.query('story', {})
        }
    }),

    // TODO: https://github.com/dockyard/ember-validations
    isValid: function () {
        return true;
    },

    saveCanvas: function () {
        if (!this.isValid())
            return;

        if (this.get('session.isAuthenticated')) {
            var canvas = this.store.createRecord('canvas', {
                title: this.get('title'),
                description: this.get('description'),
                stories: this.get('stories'),
                categories: this.get('categories'),
                authorName: this.get('author'),
                twitterName: this.get('twitter'),
                userID: this.get('currentUser.id')
            });

            var self = this;

            canvas.save().then(function (savedCanvas) {
                if (!Ember.isEmpty(savedCanvas.get('id'))) {
                    self.set('action', 'loadACanvas');
                    self.sendAction('action', savedCanvas.get('id'));
                }
            });
        }
        else {
            this.set('action', 'showLoginPopup');
            this.sendAction();

            return false;
        }
    },

    clearFields: function () {
        this.set('model', null);
    },


    onIsClosing: function () {
        this.clearFields();
    }.observes('isClosing'),

    actions: {

        cancel: function () {
            this.clearFields();
            this.set('action', 'closeManipulationPanel');
            this.sendAction('action');
        },

        save: function () {
            this.saveCanvas();
            this.sendAction('action');
            this.get('appController').closeManipulationPanel();
        }

    }

});
