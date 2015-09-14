import Ember from 'ember';

export default Ember.Controller.extend({

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
	
	addAStory: function (story) {
		if (story != null && this.get('model') != null) {
			var model = this.get('model');
			var stories = model.get('stories');
			stories.pushObject(story);
			model.save();
			this.get('appController').closeBottomDrawer();
		}
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

	appController: function () {
		return this.controllerFor('Application');
	}.property(),

	actions: {
		addAStory: function (story) {
			// alert('addAStory');
			this.addAStory(story);
		}, 
		removeAStory: function (story) {
			// alert('addAStory');
			this.removeAStory(story);
		}, 
        
	}

});
