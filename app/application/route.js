import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    onActivate: function () {
        this.controllerFor('application').shouldShowTutorial();

        // add a client-specific attr to body
        var cssClass = this.get('appSettings.solomonConfig.name');
        var bodyClientAttr = Ember.$('body').attr('solomon-app');
        if (!Ember.isEmpty(cssClass)
                && (Ember.isEmpty(bodyClientAttr) || bodyClientAttr != cssClass)) {
            Ember.$('body').attr('solomon-app', cssClass);
        }
    }.on('activate'),

    // Methods
    setupController: function (controller, model) {
        var obj = this;
        this.set('controller', controller);
        controller.set('model', model);

        // console.log('Application Setup Controller');
        // todo: look in cookie/session for username
        if (!Ember.isEmpty(this.get('session.secure.token'))) {
            // console.log('Auth - we have a session token: ' + this.get('session.secure.token'));
            controller.authLogin(this.get('session.secure.token'));
        }
    },


    // Actions
    actions: {

        // showLoginPopup: function (intro) {
        //     this.controller.showModal('ui/login-form', { title: 'Log in / Sign up', intro: intro });
        // },

        sessionRequiresAuthentication: function(){
          // Check out the docs for all the options:
          // https://auth0.com/docs/libraries/lock/customization

          // This will launch lock.js in popup mode
          var lockOptions = {authParams:{scope: 'openid'}};

          console.log('perform auth')
          this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
        },

        mailToFeedback: function () {
            window.location.href = "mailto:support@mysolomon.co.uk?subject=Leeds City Dashboard Help&body=Please provide your feedback here. If you are contacting us about a bug, it would help if you could provide a screenshot of the issue along with details about your operating system and browser. Thank you.";
        },

        showFeedbackmodal: function () {
            this.controller.showModal('ui/feedback-form');
        },

        showTutorialModal: function () {
            this.controller.showTutorial();
        },

        closeTutorial: function () {
            this.controller.closeTutorial();
        },

        showCanvasSettings: function () {
            this.controller.showCanvasSettings();
        },

        hideModal: function () {
            this.controller.hideModal();
        },

        gotoRoute: function (route, model) {
            this.controller.closeToolbox();
            if (!Ember.isEmpty(model)) {
                this.controller.transitionTo(route, (model || null));
            } else {
                // todo: check if this is the same route to prevent it trying to transition and going blank
                this.controller.transitionTo(route);
            }
        },

        openToolbox: function () {
            this.controller.openToolbox();
        },

        toggleToolbox: function () {
            this.controller.toggleToolbox();
        },

        openBottomDrawer: function (amount, contentType) {
            this.controller.openBottomDrawer(amount, { contentType: contentType });
        },

        closeBottomDrawer: function () {
            this.controller.closeBottomDrawer();
        },

        createACanvas: function (model) {
            this.controller.createACanvas(model);
        },

        showAddAStory: function () {
            this.controller.openBottomDrawer({ contentType: 'stories/add-a-story', openAmount: '-full' });
        },

        goBack: function () {
            this.controller.goBack();
        },

        loadACanvas: function (canvasModel) {
            this.controller.loadACanvas(canvasModel)
        },

        // sessionAuthenticationSucceeded: function () {
        //     console.log('Session authenticated');
        // },

        goToHelp: function () {
            var url = "https://github.com/hebeworks/Solomon/wiki";
            window.open(url, '_blank');
        }
    }
});
