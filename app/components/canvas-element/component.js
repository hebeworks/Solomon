/* globals _, $ */
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	storyIDs: [],

	didInsertElement: function () {
		Ember.run.scheduleOnce('afterRender', this, this.didRenderElement);
	},

	didRenderElement: function () {
		if(Ember.isEmpty(this.get('currentCanvas')))
			return;

    this.initPackery();
	},

	getNewlyAddedStoryIDs: function () {
		var previousIDs = this.get('storyIDs');
		var currentIDs = this.getCurrentStoryIDs();
		var newIDs = _.difference(currentIDs, previousIDs);
		this.set('storyIDs', currentIDs);
		if(currentIDs.length < previousIDs.length) {
			return -1; // stories have been removed
		}
		return newIDs;
	},

	getCurrentStoryIDs: function () {
		var $allStories = this.$('.js-story');
		var ids = _.map($allStories, function (story) {
			// return $(story).attr('id');
			return $(story).attr('data-id');
		});
		return ids;
	},

	onStoryAdded: function () {
		var obj = this;
		Ember.run.scheduleOnce('afterRender', obj, obj.updatePackery);
	}.observes('currentCanvas.stories.@each'),


	updatePackeryTimer: null,
	updatePackery: function () {
		var _this = this;
		if(!Ember.isEmpty(this.$container)){
			// console.log('updatePackery: $container exists');
			Ember.run.cancel(this.get('updatePackeryTimer'));
			// var $allStories = this.$('.js-story');
			var $container = this.$('.js-stories');
			// $container.packery('appended', $allStories);
			var newIDs = _this.getNewlyAddedStoryIDs();
			// console.log('newIDs: ' + newIDs);

			if(!Ember.isEmpty(newIDs)) { // if stories have been removed newIDs == -1 - still continue to perform packery update
			// console.log('Packery Update');
				// var selector = '.js-story';
				// var elems = this.$(selector);
				var newStorySelector = (newIDs.length > 1 ?
						'.js-story[data-id="'+newIDs.join('"],.js-story[data-id="')+'"]'
						: '.js-story[data-id="' + newIDs[0] + '"]');
				// console.log('newStorySelector = ' + newStorySelector);

				// var $newStories = $('#' + newIDs.join(',#'));
				var $newStories = $(newStorySelector);
				_this.$container.packery('appended', $newStories);
				$container.packery();

				var $itemEls = $newStories.draggable({
					cursor: 'move',
					containment: 'body',
					handle: '.js-cogs, .js-bars, .js-drag-handle',
					scroll: true,
					scrollSensitivity: 100,
					scrollSpeed: 25,
					zIndex: 4
				});
				$container.packery('bindUIDraggableEvents', $itemEls);
			}
		} else {
			// console.log('updatePackery: $container doesnt exist');
			var timer = Ember.run.later(this, this.updatePackery, 200);
			this.set('updatePackeryTimer', timer);
		}
	},

	$container: null,

	initPackery: function () {
		var obj = this;
		var $container = $('.js-stories');
		var $allStories = $('.js-story, [cpn-story]');

		// keep track of the current story's el IDs
		// so we can identify newly added stories later
		// and append to packery
		this.set('storyIDs', this.getCurrentStoryIDs());

		// Initialize packery
		this.stretchCanvas();
		setTimeout(function () {
			obj.$container = $container
				.packery({
					itemSelector: '.ember-view .story, [cpn-story]',
					columnWidth: 170,
					rowHeight: 170,
					// isInitLayout: false
				});

			// todo: SORTING & ORDERING
			// Disable initial layout with isInitLayout: false
			// If the sortOrder is available via localStorage, then edit pckry.items to match that order
			// trigger pckry.layout()

			var $itemEls = $allStories.draggable({
				cursor: 'move',
				containment: 'body',
				handle: '.js-cogs, .js-bars, .js-drag-handle',
				scroll: true,
				scrollSensitivity: 100,
				scrollSpeed: 25,
				zIndex: 4
			});
			$container.packery('bindUIDraggableEvents', $itemEls);

			obj.getItemOrder($container);
		}, 0);

		this.$(window).on('resize', function () {
			obj.stretchCanvas();
		});
	},

	getItemOrder: function ($container) {
		var obj = this;
		// show item order after layout
		function orderItems() {
			var orderArr = {};
			var itemElems = $container.packery('getItemElements');
			// debugger;
			$(itemElems).each(function (i, itemElem) {
				$(itemElem).attr('data-packery-index', i);
				var id = $(itemElem).attr('data-id');
				if (!Ember.isEmpty(id)) {
					orderArr[id] = i;
				}
			});

			obj.set('action', 'saveCurrentOrder');
			obj.sendAction('action', orderArr);
		}

		// $container.packery('on', 'layoutComplete', orderItems);
		$container.packery('on', 'dragItemPositioned', orderItems);
		// end item order
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

		// canvas.carousel.$switcher
		// 	.css({
		// 		height: canvas.dimensions.height + 'px'
		// 	});

		var colCount = Math.floor(canvas.dimensions.width / 170);
		var innerWidth = ((colCount * 170) < 340 ? 340 : (colCount * 170));
		// need to give canvas__inner an extra class to remove padding
		// also need to remove margin left auto
		// also need to give .story no margin left

		canvas.carousel.$canvases
			.css({
				//'width': canvas.dimensions.width + 'px',
				'width': innerWidth + 'px',
				// 'height': canvas.dimensions.height + 'px'
			})
			.parent()
			.css({
				'width': canvas.dimensions.width + 'px',
				// 'height': canvas.dimensions.height + 'px'
			})
			.find('.canvas__inner') // need to find out how many columns we currently have & * by the col width (170)
			.css({
				'width': canvas.dimensions.width + 'px',
				// 'height': canvas.dimensions.height + 'px'
			});
		// .style('height', canvas.dimensions.height + 'px', 'important');
	},

	actions: {
      //   gotoRoute: function (route) {
			// this.set('action', 'gotoRoute');
      //       this.sendAction('action', route);
      //   },

		onStoryLoaded: function () {
			// console.log('onStoryLoaded');
			var obj = this;
			Ember.run.scheduleOnce('afterRender', obj, obj.updatePackery);
		}
	}
});
