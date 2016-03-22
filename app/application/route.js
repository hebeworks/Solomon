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
        this.set('controller', controller);
        controller.set('model', model);
    },

    beforeModel: function(transition){
        // We set the attempted transition on the session
        // so that we can ensure the current page is persisted
        // following the sign in process.
        if(!this.get('session.isAuthenticated')) {
            this.set('session.attemptedTransition', transition);
        }
    },

    // Actions
    actions: {

        showLoginPopup: function () {
            this.controller.showModal('session-manager', {
                title: 'My Account'
            });
        },

        // This ensures that the user stays on then same
        // page following signing out, as most pages in
        // the app can be accessed regardless of session state.
        sessionInvalidationSucceeded: Ember.K,

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
            this.controller.closeManipulationPanel();
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
        
        openManipulationPanel: function(content) {
            this.controller.openManipulationPanel({content: content});
        },
        
        closeManipulationPanel: function() {
            this.controller.closeManipulationPanel();
        },

        createACanvas: function (model) {
            this.controller.createACanvas(model);
        },
        
        editAStory: function(model) {
            this.controller.editAStory(model);
        },

        showAddAStory: function () {
            this.controller.openBottomDrawer({ contentType: 'stories/add-a-story', openAmount: '-full' });
        },

        goBack: function () {
            this.controller.closeManipulationPanel();
            this.controller.goBack();
        },

        loadACanvas: function (canvasModel) {
            this.controller.loadACanvas(canvasModel)
        },

        goToHelp: function () {
            var url = "https://github.com/hebeworks/Solomon/wiki";
            window.open(url, '_blank');
        },
        
        // functions for testing
        editOrganisation: function(model) {
            this.controller.editOrganisation(model);
        },
        editOccupant: function(model) {
            this.controller.editOccupant(model);
        },
        editPerson: function(model) {
            console.log('edit person');
            console.log(model);
            this.controller.editPerson(model);
        }
    }
});
