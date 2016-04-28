import Ember from 'ember';
import config from 'hebe-dash/config/environment';

export default Ember.Controller.extend({
    appController: function () {
        return this.controllerFor('Application');
    }.property(),

    navItems: function () {
        var items = [
            // { title: 'Toolbox' },//, action: 'toggleSubNav' },
            { title: 'Toolbox', action: 'toggleToolbox', iconName: 'tools' },
            { title: 'Gallery', action: 'gotoRoute', route: 'gallery', iconName: 'gallery' },
            // { title: 'Edit org', 'action': 'editOrganisation' },
            // { title: 'Edit occupant', 'action': 'editOccupant' },
            // { title: 'Edit person', 'action': 'editPerson' }
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

  checkCanvasAuth() {
    const _this = this;
    return new Ember.RSVP.Promise((resolve, reject, complete) => {
      if (!_this.get('session.isAuthenticated')) {
        reject({ notLoggedIn: true });
      } else {
        // construct request to Solomon API to check if current user is allowed to edit this canvas
        const canvas = _this.get('model');
        const userID = _this.get('currentUser.id');
        let solomonAPIURL = config.APP.solomonAPIURL;
        const postData = {
          action: 'write',
          modelType: 'canvas',
          userID,
          scope: canvas.get('id'),
        };
        const headers = [{ key: 'Solomon-Client-Override', value: config.APP.solomonClientOverride }];
        _this.get('appSettings').getData(`${solomonAPIURL}/api/users/isallowed`, false, 'POST', postData, true, headers)
          .then(
            (isAllowed) => {
              if (isAllowed === true) {
                // TODO RESOLVE
                resolve();
              } else {
                // TODO REJECT WITH CONSISTANT ERROR
                reject({ hasPermissions: false });
                // this.set('appSettings.errorMessage', 'Sorry you need to have permission to edit a canvas');
                // TODO provide options to login/duplicate
              }
            },
            (/* err */) => {
              // TODO REJECT WITH CONSISTANT ERROR
              reject({ hasPermissions: false });
            }
        )
        .finally(() => {
          if (Ember.typeOf(complete) === 'function') {
            complete();
          }
        });
      }
    });
  },

    addAStory: function (originalStory) {
        this.checkCanvasAuth().then(
            function () {
                var canvas = this.get('model');

                if(!Ember.isEmpty(originalStory) && !Ember.isEmpty(canvas)){
                    var story = this.store.createRecord('story', {
                        id: hebeutils.guid(),
                        title: originalStory.get('title'),
                        storyType: originalStory.get('storyType'),
                        configJSON: originalStory.get('configJSON'),
                        categories: originalStory.get('categories')
                    });

                    canvas.get('stories').pushObject(story);
                    canvas.save();

                    this.get('appController').closeBottomDrawer();
                }
            }.bind(this),
            function (err) {
                var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
                if (err.notLoggedIn == true) {
                    this.get('appController').showModal('session-manager', {
                        title: 'Log in / Sign up',
                        intro: intro
                    });
                } else if (err.hasPermissions == false) {
                    intro = 'Sorry, you can only edit canvasses that belong to you';
                    this.get('appController').showModal('ui/modals/duplicate-canvas', {
                        title: 'Log in / Sign up',
                        intro: intro
                    });
                }
            }.bind(this)
        );
    },

  removeAStory(story) {
    if (story && this.get('model')) {
      const _this = this;
      this.checkCanvasAuth()
        .then(
            () => {
              const model = _this.get('model');
              const stories = model.get('stories');
              stories.removeObject(story);
              model.save();
              _this.get('appController').closeManipulationPanel();
            },
            (err) => {
              let intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
              if (err.notLoggedIn === true) {
                _this.get('appController').showModal('session-manager', {
                  title: 'Log in / Sign up',
                  intro,
                });
              } else if (err.hasPermissions === false) {
                intro = 'Sorry, you can only edit canvasses that belong to you';
                _this.get('appController').showModal('ui/modals/duplicate-canvas', {
                  title: 'Log in / Sign up',
                  intro,
                });
              }
            }
        );
    }
  },

  duplicateCanvas() {
    const _this = this;
    const currentCanvas = this.get('model');
    if (this.get('session.isAuthenticated')) {
      const userID = this.get('currentUser.id');
      if (!Ember.isEmpty(userID)) {
        const canvas = _this.store.createRecord('canvas', {
          title: currentCanvas.get('title'),
          description: currentCanvas.get('description'),
          stories: currentCanvas.get('stories'),
          categories: currentCanvas.get('categories'),
          // authorName: currentCanvas.get('author'),
          // twitterName: currentCanvas.get('twitter'),
          userID,
        });
        _this.get('appController').createACanvas(canvas);
      }
    } else {
      this.set('action', 'showLoginPopup');
      this.sendAction();
      return false;
    }
  },

  saveCurrentOrder(orderArr) {
    const _this = this;
    this.checkCanvasAuth()
      .then(() => {
        const model = _this.get('model');
        const stories = model.get('stories');
        for (const id in orderArr) {
          if (orderArr.hasOwnProperty(id)) {
            const order = orderArr[id];
            const story = stories.find((item) => item.get('id') === id);
            story.set('canvasOrderIndex', order);
          }
        }
        model.set('stories', stories);
        model.save().then((/* response */) => {
            // console.log('saved canvas order');
        });
      },
      (/* err */) => {
        // TODO what UX should we implement when not saving canvas order due to permissions?
      }
    );
  },

  saveCanvasState() {
    const _this = this;
    this.checkCanvasAuth()
      .then(
        (/* isAllowed */) => {
          const model = _this.get('model');
          model.save()
            .then((/* savedResponse */) => {
              // console.log('saved canvas state');
              // todo callback function
              // e.g. close edit a story bottom drawer
            });
        },
        (/* err */) => {
          // console.log('Not saving canvas state due to permissions');
          // if (err.notLoggedIn == true) {
          //     var intro = 'To edit a canvas, you need to be logged in. All you need is a nickname...';
          //     _this.get('appController').showModal('session-manager', { title: 'Log in / Sign up', intro: intro });
          // } else if (err.hasPermissions == false) {
          //     _this.get('appController').showModal('ui/modals/duplicate-canvas', 'Log in / Sign up', intro);
          // }
        }
      );
  },
});
