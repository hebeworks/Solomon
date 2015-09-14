import Ember from 'ember';

export default Ember.Controller.extend({

    appController: function () {
        return this.controllerFor('Application');
    }.property(),

    navItems: function () {
        var items = [
            { title: 'Toolbox', action: 'toggleToolbox' },
            // { title: 'Toolbox' },//, action: 'toggleSubNav' },
            { title: 'Gallery', action: 'gotoRoute', route: 'gallery' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-open-' + dashed;
            items[i].iconclass = 'icon-' + dashed;
            items[i].svgclass = 'svg-' + dashed;
        }

        return items;
    }.property(),

    subNavItems: function () {
        var items = [
            {
                title: 'Add a Canvas',
                action: 'createACanvas',
                iconclass: 'icon-add-canvas',
                svgclass: 'svg-icon-add-canvas'
            },
            {
                title: 'Add a story',
                action: 'showAddAStory',
                iconclass: 'icon-add-story',
                svgclass: 'svg-icon-add-story'
            },
            {
                title: 'Feedback',
                action: 'showFeedbackmodal',
                jshook: 'js-toolbox-feedback',
                iconclass: 'icon-feedback',
                svgclass: 'svg-icon-feedback'
            },
            {
                title: 'Login',
                action: 'showLoginPopup',
                jshook: 'js-toolbox-login',
                iconclass: 'icon-login',
                svgclass: 'svg-login'
            }
        ];
        return items;
    }.property(),
	
    // onModelChanged: function() {
    // 	console.log(this.get('model.content'));
    // 	this.set('canvas',this.get('model.content'));
    // }.observes('model')
    
    checkCanvasAuth: function () {
        var obj = this;
        return new Ember.RSVP.Promise(function (resolve, reject, complete) {
            if (!obj.get('session.isAuthenticated') || Ember.isEmpty(obj.get('session.secure.token'))) {
                reject({ notLoggedIn: true })
            } else if (obj.get('session.secure.token') != obj.get('model.userID')) {
                reject({ hasPermissions: false });
            } else {
                resolve();
            }
            complete();
        });
    },

    addAStory: function (story) {
        var obj = this;
        this.checkCanvasAuth()
            .then(
                function () {
                    if (story != null && obj.get('model') != null) {
                        var model = obj.get('model');
                        var stories = model.get('stories');
                        stories.pushObject(story);
                        model.save();
                        obj.get('appController').closeBottomDrawer();
                    }
                },
                function (err) {
                    if (err.notLoggedIn == true) {
                        var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                        obj.get('appController').showModal('ui/login-form', 'Register/Sign In', intro);
                    } else if (err.hasPermissions == false) {
                        obj.get('appController').showModal('ui/modals/duplicate-canvas', 'Register/Sign In', intro);
                    }
                }
                );
    },

    removeAStory: function (story) {
        if (story != null && this.get('model') != null) {
            var model = this.get('model');
            var stories = model.get('stories');
            stories.removeObject(story)
            model.save();
            this.get('appController').closeBottomDrawer();
        }
    },

    duplicateCanvas: function () {
        var obj = this;
        var currentCanvas = this.get('model');
        if (this.get('session.isAuthenticated')) {
            var userID = this.get('session.content.secure.token');
            if (!Ember.isEmpty(userID)) {
                var canvas = obj.store.createRecord('canvas', {
                    title: currentCanvas.get('title'),
                    description: currentCanvas.get('description'),
                    stories: currentCanvas.get('stories'),
                    categories: currentCanvas.get('categories'),
                    // authorName: currentCanvas.get('author'),
                    // twitterName: currentCanvas.get('twitter'),
                    userID: userID
                });

                obj.get('appController').createACanvas(canvas);

                // canvas.save()
                //     .then(function (savedCanvas) {
                //         if (!Ember.isEmpty(savedCanvas.get('id'))) {
                //             var newID = savedCanvas.get('id');
                //             obj.get('appController').loadACanvas(newID);
                //         }
                //     });
            }
        } else {
            // alert('You need to login');
            this.set('action', 'showLoginPopup');
            this.sendAction();
            return false;
        }
    
    },


    actions: {
        addAStory: function (story) {
            // alert('addAStory');
            this.addAStory(story);
        },
        removeAStory: function (story) {
            // alert('addAStory');
            this.removeAStory(story);
        }
    }

});
