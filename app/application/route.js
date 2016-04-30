import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  onActivate: function () {
    this.controllerFor('application').shouldShowTutorial();

    // hide the loading screen
    Ember.$('[cpn-loading-screen]').attr('cpn-loading-screen', 'app-is-loading');

    setTimeout(function() {
      Ember.$('[cpn-loading-screen]').attr('cpn-loading-screen', 'app-has-loaded');
    }, 1000);

    // add a client-specific attr to body
    const cssClass = this.get('appSettings.solomonConfig.name');
    const bodyClientAttr = Ember.$('body').attr('solomon-app');
    if (!Ember.isEmpty(cssClass)
      && (Ember.isEmpty(bodyClientAttr) || bodyClientAttr != cssClass)) {
      Ember.$('body').attr('solomon-app', cssClass);
    }
  }.on('activate'),

  // Methods
  setupController(controller, model) {
    this.set('controller', controller);
    controller.set('model', model);
  },

  beforeModel(transition){
    // We set the attempted transition on the session
    // so that we can ensure the current page is persisted
    // following the sign in process.
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  loggedIn: Ember.observer('session.isAuthenticated', function() {
    function loginAction() {
      const defaultCanvas = this.get('currentUser.metaData.defaultCanvas');
      if (defaultCanvas) {
        this.send('gotoRoute', defaultCanvas);
      }
    }

    if (this.get('session.isAuthenticated') === true) {
      const currentUser = this.get('currentUser');
      Ember.addObserver(currentUser, 'metaData', this, loginAction);
    } else if (this.get('session.isAuthenticated') === false) {
      // refresh page to check permissions after logout
      // TODO get proper post - login / logout events working
      // var currentRoute = this.controllerFor('application').get('currentRouteName');
      // if (currentRoute === 'stay-on-this-route') {
        window.location.reload();
      // } else {
        // this._super();
      // }
    }
  }),

  // Actions
  actions: {

    // sessionInvalidationSucceeded: function () {
    // },

    showLoginPopup() {
      this.controller.showModal('session-manager', {
        title: 'My Account',
      });
    },

    // This ensures that the user stays on then same
    // page following signing out, as most pages in
    // the app can be accessed regardless of session state.
    sessionInvalidationSucceeded: Ember.K,

    mailToFeedback() {
      window.location.href = 'mailto:support@mysolomon.co.uk?subject=Leeds City Dashboard Help&body=Please provide your feedback here. If you are contacting us about a bug, it would help if you could provide a screenshot of the issue along with details about your operating system and browser. Thank you.';
    },

    showFeedbackmodal() {
      this.controller.showModal('ui/feedback-form');
    },

    showTutorialModal() {
      this.controller.showTutorial();
    },

    closeTutorial() {
      this.controller.closeTutorial();
    },

    showCanvasSettings() {
      this.controller.showCanvasSettings();
    },

    hideModal() {
      this.controller.hideModal();
    },

    gotoRoute(route, model) {
      this.controller.closeToolbox();
      this.controller.closeManipulationPanel();
      if (!Ember.isEmpty(model)) {
        this.controller.transitionTo(route, (model || null));
      } else {
          // todo: check if this is the same route to prevent it trying to transition and going blank
        this.controller.transitionTo(route);
      }
    },

    openToolbox() {
      this.controller.openToolbox();
    },

    toggleToolbox() {
      this.controller.toggleToolbox();
    },

    openBottomDrawer(amount, contentType) {
      this.controller.openBottomDrawer(amount, { contentType });
    },

    closeBottomDrawer() {
      this.controller.closeBottomDrawer();
    },

    openManipulationPanel(content) {
      const panelOptions = Ember.typeOf(content) === 'string' ?
                            { content } : content;
      this.controller.openManipulationPanel(panelOptions);
    },

    closeManipulationPanel() {
      this.controller.closeManipulationPanel();
    },

    createACanvas(model) {
      this.controller.createACanvas(model);
    },

    deleteACanvas(model) {
      this.controller.deleteACanvas(model);
    },

    editAStory(model) {
      this.controller.editAStory(model);
    },

    showAddAStory() {
      this.controller.openBottomDrawer({ contentType: 'stories/add-a-story', openAmount: '-full' });
    },

    goBack() {
      this.controller.closeManipulationPanel();
      this.controller.goBack();
    },

    loadACanvas(canvasModel) {
      this.controller.loadACanvas(canvasModel);
    },

    goToHelp() {
      const url = 'https://github.com/hebeworks/Solomon/wiki';
      window.open(url, '_blank');
    },

    // functions for testing
    editOrganisation(model) {
      this.controller.editOrganisation(model);
    },
    editOccupant(model) {
      this.controller.editOccupant(model);
    },
    editPerson(model) {
      this.controller.editPerson(model);
    },
  },
});
