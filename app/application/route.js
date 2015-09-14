import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
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
        showLoginPopup: function (intro) {
            this.controller.showModal('ui/login-form', 'Register/Sign In', intro);  
        },
        
        mailToFeedback: function () {
            window.location.href = "mailto:support@mysolomon.co.uk?subject=Leeds City Dashboard Help&body=Please provide your feedback here. If you are contacting us about a bug, it would help if you could provide a screenshot of the issue along with details about your operating system and browser. Thank you.";
        },
        
        showFeedbackmodal: function() {
            this.controller.showModal('ui/feedback-form');  
        },
        
        hideModal: function() {
            this.controller.hideModal();  
        },

        gotoRoute: function (route, model) {
            this.controller.closeToolbox();
            if (!Ember.isEmpty(model)) {
                this.controller.transitionTo(route, (model || null));
            } else {
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

        loadACanvas: function (canvasID) {
            this.controller.loadACanvas(canvasID)
        },
    }
});
