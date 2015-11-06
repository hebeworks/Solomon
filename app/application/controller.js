import Ember from 'ember';

export default Ember.Controller.extend({
	// Properties
	isModalVisible: false,
	modalComponent: 'ui/login-form',

	appController: function () {
        return this;
	}.property(),

	history: [],
	hasHistory: function () {
		return this.get('history.length') > 1;
	}.property('history.length'),

	watchHistory: function () {
		// console.log('adding current path: ' + this.get('currentPath') + ' to history.');
		this.get('history').pushObject(this.get('currentPath'));
	}.observes('currentPath'),

	getSiteConfig: function () {
        // Todo: get the site config from a request to Solomon API 
		// (using the response header) e.g. Solomon-Client	solomon_local_dev
        var hostname = window.location.hostname;
        var siteConfig = {};
        if (hostname.indexOf('leedsdatamill') > -1) {
            siteConfig.name = 'lcd';
            siteConfig.title = 'Leeds City Dashboard';
        } else {
            siteConfig.name = 'solomon';
            siteConfig.title = 'Solomon';
        }
        console.log('Site Config: ' + Ember.inspect(siteConfig));
        this.set('siteConfig', siteConfig);
	},

	// Methods
    authLogin: function (username) {
        var obj = this;
		// debugger;
		// console.log('authLogin: ' + username);
        return new Ember.RSVP.Promise(function (resolve, reject, complete) {
			// obj.get('session').authenticate('authenticator:unique', 'nate')
			obj.get('session').authenticate('authenticator:unique', username)
                .then(
                    function (message) {
                        // _this.set('errorMessage', message);
						// console.log('authLogin.then username: ' + username + ', message: ' + message);
						var foundUserCallback = function (user) {
							// console.log('foundUserCallback: ' + user.username)
							debugger;
							obj.get('currentUser').set('content', user);
							resolve(user);
						};

						if (!Ember.isEmpty(username)) {
							// console.log('username is not empty');
							// return obj.store.find('user', { username: username })
							return obj.store.find('user', username)
								.then(
									foundUserCallback,
									function () {
										// console.log('User not found');
										reject(new Error('User not found'));
									});
						} else {
							var token = obj.get('session.content.secure.token');
							// console.log('username IS empty token is: ' + token);
							return obj.store.find('user', token)
								.then(
									foundUserCallback,
									function () {
										reject(new Error('User not found'));
									});
						}
                    },
                    function (message) {
						// debugger;
                        // _this.set('errorMessage', message);
                        // console.log('Error authenticating: ' + message);
                        reject(message);
                    }
					);
        });
    },

	showModal: function (component, title, intro) {
		this.set('modalComponent', component);
		if (!Ember.isEmpty(title)) {
			this.set('modalTitle', title);
		}
		this.set('modalIntro', intro);
		this.set('isModalVisible', true);
	},

	hideModal: function () {
		this.set('isModalVisible', false);
	},

	showTutorialTimer: null,
	shouldShowTutorial: function (force) {
		if (Cookies.get('viewedTutorial')) {
			// unauthed session has seen tutorial
			// stop the timer & observer
			Ember.removeObserver(this, 'currentUser.content', this, this.shouldShowTutorial);
			Ember.run.cancel(this.get('showTutorialTimer'));
		} else if (!Ember.isEmpty(this.get('currentUser.content')) && this.get('currentUser.content.config.viewedTutorial') == true) {
			// have a user and has seen tutorial
			// stop the timer & observer
			Ember.removeObserver(this, 'currentUser.content', this, this.shouldShowTutorial);
			Ember.run.cancel(this.get('showTutorialTimer'));
		} else {
			// show the tutorial in 5 seconds
			var timer = Ember.run.later(this, this.showTutorial, 5000);
			this.set('showTutorialTimer', timer);
			// if too early for authed user - observe for it being set
			// if it is set in the meantime, the timer will be cancelled
			Ember.addObserver(this, 'currentUser.content', this, this.shouldShowTutorial);
		}
	},

	showTutorial: function () {
		Ember.removeObserver(this, 'currentUser.content', this, this.shouldShowTutorial);
		Ember.run.cancel(this.get('showTutorialTimer'));
		this.showModal('ui/tutorial-intro');
	},

	closeTutorial: function () {
		Ember.removeObserver(this, 'currentUser.content', this, this.shouldShowTutorial);
		var authedUser = this.get('currentUser.content');

		if (!Ember.isEmpty(authedUser)) {
			// if we have authed session user
			// set viewed flag
			var userConfig = authedUser.get('config');
			userConfig.viewedTutorial = true;
			authedUser.set('config', userConfig);
			authedUser.save();
		}
		Cookies.set('viewedTutorial', true);
		this.hideModal();
	},

	openToolbox: function () {
		// canvas.carousel.$switcher.removeClass('-blurred');
		// Drawer.toggleTop();
		// Drawer.closeBottom();
		this.set('canvasBlurred', true);
		this.set('topOpen', true);
		$('.js-open-toolbox').addClass('-selected');
	},

	closeToolbox: function () {
		// canvas.carousel.$switcher.removeClass('-blurred');
		// Drawer.toggleTop();
		// Drawer.closeBottom();
		this.set('canvasBlurred', false);
		this.set('topOpen', false);
		$('.js-open-toolbox').removeClass('-selected');
	},

	toggleToolbox: function () {
		if (this.get('topOpen') == true) {
			this.closeToolbox();
		} else {
			this.openToolbox();
		}
	},

	openBottomDrawer: function (configParams) {
		var config = Ember.$.extend({ open: true, openAmount: '-half' }, configParams)
		this.closeToolbox();
		this.set('bottomDrawerConfig', config);
		this.set('canvasBlurred', true);
		// Drawer.closeTop();
		// Drawer.openBottomHalf();
	},

	closeBottomDrawer: function () {
		var config = Ember.$.extend({ open: false, openAmount: '-half' })
		this.set('canvasBlurred', false);
		this.set('bottomDrawerConfig', config);
	},

	goBack: function () {
		// implement your own history popping that actually works ;)
		if (this.get('hasHistory')) {
			this.get('history').popObject();
			window.history.back();
			this.get('history').popObject(); // get rid of route change here, don't need it
		} else {
			this.get('target').transitionTo('index');
		}
	},

	loadACanvas: function (canvas) {
		var canvasID = canvas;
		// use a canvases friendlyURL if it exists
		if (Ember.typeOf(canvas) == 'instance') {
			if (!Ember.isEmpty(canvas.get('friendlyURL'))) {
				canvasID = canvas.get('friendlyURL');
			} else if (!Ember.isEmpty(canvas.get('urlShortcode'))) {
				canvasID = canvas.get('urlShortcode');
			} else {
				canvasID = canvas.get('id');
			}
		}
        // var canvasID = canvas.get('id');
        // console.log(canvasID);
        this.get('target').transitionTo('canvas', canvasID);
        this.get('appController').closeBottomDrawer();
    },

	createACanvas: function (model) {
		var params = { contentType: 'canvas-gallery/create-a-canvas' };
		if (!Ember.isEmpty(model)) {
			params.model = model;
			params.mainTitle = 'Duplicate a canvas'
		}
		this.openBottomDrawer(params);
	}

});
