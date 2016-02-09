import Ember from 'ember';

export default Ember.Controller.extend({
	// Properties
	isModalVisible: false,
	modalOptions: {},

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

	onErrorMessage: function () {
		var _this = this;
		var errorMessage = this.get('appSettings.errorMessage');
		function clearErrorMessage() {
			_this.set('appSettings.errorMessage', null);
		}
		if (!Ember.isEmpty(errorMessage)) {
			this.showModal(null, { title: 'Oops there was a problem', intro: errorMessage, onCloseCallback: clearErrorMessage });
		}
	}.observes('appSettings.errorMessage'),

	obSolomonConfigChange: function () {
        // Todo: get the site config from a request to Solomon API
		// (using the response header) e.g. Solomon-Client	solomon_local_dev
		this.set('pageTitle', this.get('appSettings.solomonConfig.title'));
	}.observes('appSettings.solomonConfig'),

	_pageTitle: '',
	pageTitle: Ember.computed({
		get() {
			return this.get('_pageTite');
		},
		set(key, value) {
			if (this.get('_pageTitle') != value) {
				this.set('_pageTitle', value);
				if (!Ember.isEmpty(value)) {
					Ember.$(document).attr('title', value);
				}
			}
		}
	}),

	// Methods

	showModal: function (component, options) {
		var modalOptions = _.extend(
			{ // default modal options
				preventCanvasBlur: true,
				effect: 'md-effect-1',
				title: '',
				component: component,
				intro: '',
				canvasWasBlurred: this.get('canvasBlurred')
			},
			options
			);
		this.set('modalOptions', modalOptions);
		this.set('modalOptions.isVisible', true);

		if (this.get('modalOptions.preventCanvasBlur') == false) {
			this.set('canvasBlurred', true);
		}

		if (!Ember.isEmpty(this.get('modalOptions.onCloseCallback'))
			&& Ember.isEmpty(options.onCloseCallback)) {
			// there is a on close callback function - but it wasn't just passed
			// so clear it
			this.get('modalOptions.onCloseCallback', null);
		}
		// this.set('modalEffect', modalOptions.modalEffect);
		// this.set('modalComponent', component);
		// if (!Ember.isEmpty(title)) {
		// 	this.set('modalTitle', title);
		// }
		// if (modalOptions.preventCanvasBlur != false) {
		// 	this.set('canvasBlurred', true);
		// }
		// this.set('modalIntro', intro);
		// this.set('isModalVisible', true);
	},

	hideModal: function () {
		if (this.get('canvasBlurred') == true && this.get('modalOptions.canvasWasBlurred') == false) {
			this.set('canvasBlurred', false);
		}
		if (!Ember.isEmpty(this.get('modalOptions.onCloseCallback')) &&
			_.isFunction(this.get('modalOptions.onCloseCallback'))) {
				this.get('modalOptions.onCloseCallback')();
		}
		this.setProperties({
			'modalOptions.component': null,
			'modalOptions.isVisible': false
		});
	},

	showTutorialTimer: null,

	shouldShowTutorial: function (force){
		if (Modernizr.mq('screen and (min-width: 768px)') && !Cookies.get('viewedTutorial')){
			this.set('showTutorialTimer', Ember.run.later(this, this.showTutorial, 5000));
		}
	},

	showTutorial: function () {
		if (!this.get('isModalVisible')){
			Ember.run.cancel(this.get('showTutorialTimer'));
			this.showModal('ui/tutorial-intro', 'Tutorial');
		}
	},

	closeTutorial: function () {
		this.hideModal();

		Cookies.set('viewedTutorial', true);
	},

	openToolbox: function () {
		this.set('canvasBlurred', true);
		this.set('topOpen', true);

		$('.js-open-toolbox').addClass('-selected');
	},

	closeToolbox: function (){
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
		var config = Ember.$.extend({ open: true, openAmount: '-half' }, configParams);
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
		var params = {
			contentType: 'canvas-gallery/create-a-canvas',
			openAmount: '-full'
		};
		if (!Ember.isEmpty(model)) {
			params.model = model;
			params.mainTitle = 'Duplicate a canvas'
		}
		this.openBottomDrawer(params);
	},

	showCanvasSettings: function () {
		this.showModal('canvas-settings', 'Canvas Settings', '', true);
	},
    
    editAStory: function (model) {
		var params = { 
			contentType: 'stories/edit-a-story',
			preventCanvasBlur: true
		};
		if (!Ember.isEmpty(model)) {
			params.model = model;
			params.mainTitle = 'Edit a story';
		}
		this.openBottomDrawer(params);
	},


});
