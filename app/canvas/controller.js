import Ember from 'ember';

export default Ember.Controller.extend({
    appController: function () {
        return this.controllerFor('Application');
    }.property(),

    navItems: function () {
        var items = [
            // { title: 'Toolbox' },//, action: 'toggleSubNav' },
            { title: 'Toolbox', action: 'toggleToolbox', iconName: 'tools' },
            { title: 'Gallery', action: 'gotoRoute', route: 'gallery', iconName: 'gallery' }
        ];

        for (var i = 0; i < items.length; i++) {
            var dashed = items[i].title.dasherize();
            items[i].dashed = '-' + dashed;
            items[i].jshook = 'js-open-' + dashed;
            items[i].iconclass = 'icon--' + items[i].iconName;
            items[i].svgclass = 'svg-icon--' + items[i].iconName;
        }

        return items;
    }.property(),

    subNavItems: function () {
        var currentUserEmail = this.get('currentUser.email'),
            loginText = null,
            iconClassModifier = null;

        if (currentUserEmail) {
            loginText = 'Me';
            iconClassModifier = 'icon--you-me--me';
        } else {
            loginText = 'You';
            iconClassModifier = 'icon--you-me--you';
        }

        var items = [
            {
                title: 'Add canvas',
                action: 'createACanvas',
                iconclass: 'icon--add-canvas',
                svgclass: 'svg-icon--add-canvas'
            },
            {
                title: 'Add story',
                action: 'showAddAStory',
                iconclass: 'icon--add-story',
                svgclass: 'svg-icon--add-story'
            },
            {
                title: 'Feedback',
                action: 'showFeedbackmodal',
                jshook: 'js-toolbox-feedback',
                iconclass: 'icon--feedback',
                svgclass: 'svg-icon--feedback'
            },
            {
                title: loginText,
                action: 'showLoginPopup',
                jshook: 'js-toolbox-login',
                iconclass: 'icon--you-me' + ' ' + iconClassModifier,
                svgclass: 'svg-icon--you-me'
            },
            {
                title: 'Help',
                action: 'goToHelp',
                jshook: 'js-toolbox-help',
                iconclass: 'icon--help',
                svgclass: 'svg-icon--help'
            },
            {
                title: 'Tutorial',
                action: 'showTutorialModal',
                jshook: 'js-toolbox-tutorial',
                iconclass: 'icon--tutorial',
                svgclass: 'svg-icon--tutorial'
            }
        ];
        if (this.get('appSettings.solomonConfig.name') == "yorkshire-water") {
            items.push({
                title: 'Filter canvas',
                action: 'showCanvasSettings',
                iconclass: 'icon--filter',
                svgclass: 'svg-icon--filter'
            });
        }
        Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
        return items;
    }.property('currentUser.email'),

    checkCanvasAuth: function () {
        var obj = this;
        return new Ember.RSVP.Promise(function (resolve, reject, complete) {
            if (!obj.get('session.isAuthenticated')) {
                reject({ notLoggedIn: true })
            }
            else if (obj.get('currentUser.id') != obj.get('model.userID')) {
                reject({ hasPermissions: false });
            } else {
                resolve();
            }
            if (Ember.typeOf(complete) == 'function') {
                complete();
            }
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
                        story.set('id', hebeutils.guid());
                        stories.pushObject(story);
                        model.save();
                        obj.get('appController').closeBottomDrawer();
                    }
                },
                function (err) {
                    var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                    if (err.notLoggedIn == true) {
                        obj.get('appController').showModal('session-manager', {
                            title: 'Log in / Sign up',
                            intro: intro
                        });
                    } else if (err.hasPermissions == false) {
                        intro = 'Sorry, you can only edit canvasses that belong to you';
                        obj.get('appController').showModal('ui/modals/duplicate-canvas', {
                            title: 'Log in / Sign up',
                            intro: intro
                        });
                    }
                }
                );
    },

    removeAStory: function (story) {
        if (story != null && this.get('model') != null) {
            var obj = this;
            this.checkCanvasAuth()
                .then(
                    function () {
                        var model = obj.get('model');
                        var stories = model.get('stories');
                        stories.removeObject(story)
                        model.save();
                        obj.get('appController').closeBottomDrawer();
                    },
                    function (err) {
                        var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                        if (err.notLoggedIn == true) {
                            obj.get('appController').showModal('session-manager', {
                                title: 'Log in / Sign up',
                                intro: intro
                            });
                        } else if (err.hasPermissions == false) {
                            intro = 'Sorry, you can only edit canvasses that belong to you';
                            obj.get('appController').showModal('ui/modals/duplicate-canvas', {
                                title: 'Log in / Sign up',
                                intro: intro
                            });
                        }
                    }
                    );
        }
    },

    duplicateCanvas: function () {
        var obj = this;
        var currentCanvas = this.get('model');
        if (this.get('session.isAuthenticated')) {
            var userID = this.get('currentUser.id');
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
        }
        else {
            this.set('action', 'showLoginPopup');
            this.sendAction();

            return false;
        }

    },

    saveCurrentOrder: function (orderArr) {
        var obj = this;
        this.checkCanvasAuth()
            .then(
                function () {
                    var model = obj.get('model');
                    var stories = model.get('stories');
                    // debugger;
                    for (var id in orderArr) {
                        if (orderArr.hasOwnProperty(id)) {
                            var order = orderArr[id];
                            // debugger;

                            var story = stories.find(function (item) {
                                return item.get('id') == id;
                            });
                            story.set('canvasOrderIndex', order);
                        }
                    }
                    model.set('stories', stories);
                    model.save().then(function (response) {
                        console.log('saved canvas order');
                    })
                },
                function (err) {
                    console.log('Not saving canvas order due to permissions');
                    // if (err.notLoggedIn == true) {
                    //     var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                    //     obj.get('appController').showModal('session-manager', { title: 'Log in / Sign up', intro: intro });
                    // } else if (err.hasPermissions == false) {
                    //     obj.get('appController').showModal('ui/modals/duplicate-canvas', 'Log in / Sign up', intro);
                    // }
                }
                );
    },

    saveCanvasState: function () {
        var obj = this;
        this.checkCanvasAuth()
            .then(
                function () {
                    var model = obj.get('model');
                    // debugger;
                    model.save().then(function (response) {
                        console.log('saved canvas state');
                        // todo callback function
                        // e.g. close edit a story bottom drawer
                    })
                },
                function (err) {
                    console.log('Not saving canvas state due to permissions');
                    // if (err.notLoggedIn == true) {
                    //     var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                    //     obj.get('appController').showModal('session-manager', { title: 'Log in / Sign up', intro: intro });
                    // } else if (err.hasPermissions == false) {
                    //     obj.get('appController').showModal('ui/modals/duplicate-canvas', 'Log in / Sign up', intro);
                    // }
                }
            );
    }
});
