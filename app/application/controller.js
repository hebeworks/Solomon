import Ember from 'ember';

export default Ember.Controller.extend({
  // Properties
  queryParams: ['modal-state-manipulation-panel', 'modal-state-bottom-drawer'],
  'modal-state-manipulation-panel': null,
  'modal-state-bottom-drawer': null,
  onModalStateManipulationPanel: function onModalStateManipulationPanel() {
    const modalStateManipulationPanel = this.get('modal-state-manipulation-panel');
    if (!modalStateManipulationPanel && this.get('manipulationPanel.state.opening')) {
      // modalContent is null but the manipulation panel is open
      this.closeManipulationPanel();
    }
  }.observes('modal-state-manipulation-panel'),
  onModalStateBottomDrawer: function onModalStateBottomDrawer() {
    const modalStateBottomDrawer = this.get('modal-state-bottom-drawer');
    if (!modalStateBottomDrawer && this.get('bottomDrawerConfig.open')) {
      // modalContent is null but the bottom drawer is open
      this.closeBottomDrawer();
    }
  }.observes('modal-state-bottom-drawer'),
  isModalVisible: false,
  modalOptions: {},
  manipulationPanel: {
    state: {
        viewportWidth: null
    },
    options: {}
  },

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

onGeneralMessage: function onGeneralMessage() {
  const _this = this;
  const message = this.get('appSettings.generalMessage');
  function clearGeneralMessage() {
    _this.set('appSettings.generalMessage', null);
  }

  if (!Ember.isEmpty(message)) {
    const generalMessage = message.message || '';
    const title = message.title || '';
    if (!Ember.isEmpty(generalMessage)) {
      this.showModal(null, {
        title, intro: generalMessage,
        onCloseCallback: clearGeneralMessage,
      });
    }
  }
}.observes('appSettings.generalMessage'),

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

  showModal(component, options) {
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

  hideModal() {
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

  shouldShowTutorial(force) {
      if (Modernizr.mq('screen and (min-width: 768px)') && !Cookies.get('viewedTutorial')) {
          this.set('showTutorialTimer', Ember.run.later(this, this.showTutorial, 5000));
      }
  },

  showTutorial() {
      if (!this.get('modalOptions.isVisible')) {
          Ember.run.cancel(this.get('showTutorialTimer'));
          this.showModal('ui/tutorial-intro', 'Tutorial');
      }
  },

  closeTutorial() {
      this.hideModal();

      Cookies.set('viewedTutorial', true);
  },

  openToolbox() {
      this.set('canvasBlurred', true);
      this.set('topOpen', true);

      $('.js-open-toolbox').addClass('-selected');

      this.closeBottomDrawer();
      this.closeManipulationPanel();
  },

  closeToolbox() {
      this.set('canvasBlurred', false);
      this.set('topOpen', false);
      $('.js-open-toolbox').removeClass('-selected');
  },

  toggleToolbox() {
      if (this.get('topOpen') == true) {
          this.closeToolbox();
      } else {
          this.openToolbox();
          this.closeBottomDrawer();
          this.closeManipulationPanel();
      }
  },

  openBottomDrawer(configParams) {
    this.set('modal-state-bottom-drawer', 'bottom-drawer');
    const config = Ember.$.extend({
      open: true,
      openAmount: '-half',
      blurred: true,
    }, configParams);

    this.closeToolbox();
    this.closeManipulationPanel();
    this.set('bottomDrawerConfig', config);
    this.set('canvasBlurred', config.blurred);
  },

  closeBottomDrawer() {
    this.set('modal-state-bottom-drawer', 'null');
    const config = Ember.$.extend({
      open: false,
      openAmount: '-half',
      blurred: false,
    });

    this.set('bottomDrawerConfig', config);
    this.set('canvasBlurred', config.blurred);
  },

  openManipulationPanel(panelOptions) {
    var options = Ember.Object.create(Ember.$.extend({}, panelOptions));

    this.setProperties({
        'manipulationPanel.state.closing': false,
        'manipulationPanel.state.opening': true
    });
    this.set('manipulationPanel.options', options);

    this.closeToolbox();
    this.closeBottomDrawer();
    this.set('canvasBlurred', options.blurCanvas);
  },

  closeManipulationPanel () {
    this.set('modal-state-manipulation-panel', null);
    this.setProperties({
        'manipulationPanel.state.closing': true,
        'manipulationPanel.state.opening': false,
        'manipulationPanel.options.content': null
    });
    this.set('canvasBlurred', false);
  },

  goBack () {
      // implement your own history popping that actually works ;)
      if (this.get('hasHistory')) {
          this.get('history').popObject();
          window.history.back();
          this.get('history').popObject(); // get rid of route change here, don't need it
      } else {
          this.get('target').transitionTo('index');
      }
  },

  loadACanvas (canvas) {
      var canvasID = canvas;
      // use a canvases friendlyURL if it exists
      if (Ember.typeOf(canvas) == 'instance') {
          if (!Ember.isEmpty(canvas.get('friendlyURL'))) {
              canvasID = canvas.get('friendlyURL');
          } else if (!Ember.isEmpty(canvas.get('shortcode'))) {
              canvasID = canvas.get('shortcode');
          } else {
              canvasID = canvas.get('id');
          }
      }
      // var canvasID = canvas.get('id');
      // console.log(canvasID);
      this.get('target').transitionTo('canvas', canvasID);
      this.get('appController').closeBottomDrawer();
  },

  createACanvas (model) {
      var panelState = {
          content: 'canvas-gallery/create-a-canvas',
          title: 'Add a canvas',
          blurCanvas: true
      };

      if (!Ember.isEmpty(model)) {
          panelState.model = model;
      }

      this.openManipulationPanel(panelState);
  },

  showCanvasSettings () {
      this.showModal('canvas-settings', 'Canvas Settings', '', true);
  },

  editAStory (model) {
      var panelState = {
          content: 'stories/edit-a-story',
          blurCanvas: false
      };

      if (!Ember.isEmpty(model)) {
          panelState.model = model;
          panelState.title = "Edit a story";
          panelState.subTitle = model.get('title');
      }

      this.openManipulationPanel(panelState);
  },

  editOrganisation(model) {
    var panelState = {
        content: 'bid/organisation-edit',
        blurCanvas: true
    }

    panelState.model = model;
    panelState.title = "Edit an organisation";

    this.openManipulationPanel(panelState);
  },

  editOccupant: function(model) {
      var panelState = {
          content: 'bid/occupant-edit',
          blurCanvas: true
      }

      panelState.model = model;
      panelState.title = "Edit an occupant";

      this.openManipulationPanel(panelState);
  },

  editPerson: function(model) {
      var panelState = {
          content: 'bid/person-edit',
          blurCanvas: true
      }

      panelState.model = model;
      panelState.title = "Edit a person";

      this.openManipulationPanel(panelState);
  }
});
