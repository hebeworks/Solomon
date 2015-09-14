import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	storyIDs: [],
	
	didInsertElement: function () {
		Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
	},

	didRenderElement: function () {
		// console.log('didRenderElement');
        // Canvas.init();
        // HebeDash.init();
		this.initPackery();
	},

	getNewlyAddedStoryIDs: function () {
		var previousIDs = this.get('storyIDs');
		var currentIDs = this.getCurrentStoryIDs();
		var newIDs = _.difference(currentIDs, previousIDs);
		this.set('storyIDs',currentIDs);
		return newIDs;
	},
	
	getCurrentStoryIDs: function () {
		var $allStories = this.$('.js-story');
		var ids = _.map($allStories, function (story) {
			return $(story).attr('id');
		});
		return ids;
	},

	onStoryAdded: function () {
		var obj = this;
		Ember.run.scheduleOnce('afterRender', obj, obj.updatePackery);
	}.observes('currentCanvas.stories.@each'),

	updatePackery: function () {
		var obj = this;
		setTimeout(function () {
			// var $allStories = this.$('.js-story');
			var $container = this.$('.js-stories');
			// $container.packery('appended', $allStories);
			var newIDs = obj.getNewlyAddedStoryIDs();
			// var selector = '.js-story';
			// var elems = this.$(selector);
			var $newStories = $('#' + newIDs.join(',#'));
			obj.$container.packery('appended', $newStories);
			$container.packery();
			
			var $itemEls = $newStories.draggable({
				cursor: 'move',
				containment: 'body',
				handle: '.js-cogs, .js-drag-handle',
				scroll: true,
				scrollSensitivity: 100,
				scrollSpeed: 25,
				zIndex: 4
			});
			$container.packery('bindUIDraggableEvents', $itemEls);
		}, 100);
	},

	$container: null,

	initPackery: function () {
		var obj = this;
		var $container = $('.js-stories');
		var $allStories = $('.js-story');

		// keep track of the current story's el IDs
		// so we can identify newly added stories later
		// and append to packery 
		this.set('storyIDs', this.getCurrentStoryIDs());

		// Initialize packery
		this.stretchCanvas();
		setTimeout(function () {
			obj.$container = $container
				.packery({
					itemSelector: '.ember-view .story',
					columnWidth: 170,
					rowHeight: 170
				});

			var $itemEls = $allStories.draggable({
				cursor: 'move',
				containment: 'body',
				handle: '.js-cogs, .js-drag-handle',
				scroll: true,
				scrollSensitivity: 100,
				scrollSpeed: 25,
				zIndex: 4
			});
			$container.packery('bindUIDraggableEvents', $itemEls);
		}, 0);
		
		this.$(window).on('resize', function(){
			obj.stretchCanvas();
		});
	},

	stretchCanvas: function () {
		// console.log('Canvas-element.stretch');
		var canvas = {
			dimensions: {},
			carousel: {
				$switcher: $('.js-canvas-switcher'),
				$canvases: $('.js-canvas')
			}
		};
		var $window = $(window);
		var $header = $('.js-site-header');

		canvas.dimensions.width = $window.width();
		canvas.dimensions.height = $window.height() - ($header ? $header.height() : 0);

		// console.log(canvas.dimensions.height);

		canvas.carousel.$switcher
			.css({
				height: canvas.dimensions.height + 'px'
			});

		var colCount = Math.floor(canvas.dimensions.width / 170);
		var innerWidth = ((colCount * 170) < 340 ? 340 : (colCount * 170));
		// need to give canvas__inner an extra class to remove padding
		// also need to remove margin left auto
		// also need to give .story no margin left 

		canvas.carousel.$canvases
			.css({
				//'width': canvas.dimensions.width + 'px',
				'width': innerWidth + 'px',
				'height': canvas.dimensions.height + 'px'
			})
			.parent()
			.css({
				'width': canvas.dimensions.width + 'px',
				'height': canvas.dimensions.height + 'px'
			})
			.find('.canvas__inner') // need to find out how many columns we currently have & * by the col width (170)
			.css({
				'width': canvas.dimensions.width + 'px',
				'height': canvas.dimensions.height + 'px'
			})
			.style('height', canvas.dimensions.height + 'px', 'important');
	},

	actions: {
        gotoRoute: function (route) {
			this.set('action', 'gotoRoute');
            this.sendAction('action', route);
        },
		
		onStoryLoaded: function() {
			// console.log('onStoryLoaded');
			var obj = this;
			Ember.run.scheduleOnce('afterRender', obj, obj.updatePackery);
		}
	}
});
