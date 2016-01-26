import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {

import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	storyModel: null,
	onInit: function () {
		this.appendComponentNameClass();
	}.on('init'),
	
	appendComponentNameClass: function() {
        if(Ember.isEmpty(this.__proto__)) { // delayed check because this.__proto__ is initially undefined in IE
            var _this = this;
            setTimeout(_this.appendComponentNameClass, 200);
        } else {
            var dasherizedStoryName = s.strRightBack(this.__proto__._debugContainerKey, "/");
            this.set('solomon-story', dasherizedStoryName);
            this.attributeBindings.push('solomon-story');
        }
	}
});


