import Ember from 'ember';

export default Ember.Component.extend({
	// Properties
	visible: false,

	effect: 'md-effect-1',
	perspective: false,

	container: null,
	modal: null,
	close: null,
	documentEl: null,
	overlay: null,
	
	// Methods
	ensureDOM: function () {
		this.documentEl = this.$('.js-dashboard-wrapper');
		this.container = this.$('.js-dashboard-wrapper');
		this.overlay = this.$('.md-overlay');
		this.modal = this.$('.md-modal');
		this.close = this.$('.md-close');
	},

	onVisibleChange: function () {
		if (this.get('visible') == true) {
			this.showModal();
		} else {
			this.hideModal();
		}
	}.observes('visible'),

	showModal: function () {
		this.ensureDOM();
		this.modal.addClass('md-show');
		if (this.perspective) {
			this.documentEl.addClass('md-perspective');
		}
	},

	hideModal: function () {
		this.ensureDOM();
		this.modal.removeClass('md-show');

		if (this.perspective) {
			this.documentEl.removeClass('md-perspective');
		}
	},
	
	// Actions
	actions: {
		close: function () {
			this.set('visible', false);
		}
	}
	
	
	// isResponsive: false,
	
	// onVisibleChange: function() {
	// 	var obj = this;
	// 	if(this.get('visible') == true) {
	// 		// perform DOM actions
	//         Ember.run.scheduleOnce('afterRender', this, obj.onPopupActivate);
	// 	}
	// }.observes('visible'),
	
	// onPopupActivate: function() {
	// 	setTimeout(function(){
	// 		grunticon.embedSVG();
	// 	}, 200);
		
	// 	this.ensureWidth();	
	// },
	
	// ensureWidth: function(){ 
	// 	// Check for max width & height
	// 	var body = {
	// 		width: this.$('body').width(),
	// 		minHeight: this.$('body').height()
	// 	};
		
	// 	var dimensions = {
	// 		width: this.$().width(),
	// 		minHeight: this.$().height()
	// 	};
		
	// 	if(dimensions.width > body.width) {
	// 		this.set('isResponsive',true);
	// 	} else {
	// 		this.set('isResponsive',true);
	// 	}
	// 	this.ensureTop();			
	// },
	
	// ensureTop: function() {
	// 	var obj = this;
	// 	setTimeout(function(){
	// 		if(obj.$('.fullscreen-popup').offset().top < 100) {
	// 			var newTop = (obj.$('.fullscreen-popup').height() / 2) + 10;
	// 			obj.$('.fullscreen-popup').css({
	// 				top: newTop + 'px',
	// 			});
	// 		} else {
	// 			obj.$('.fullscreen-popup').css({
	// 				top:'50%',
	// 				marginTop: '-12em'
	// 			});
	// 		}
	// 	}, 200);
	// },
});
