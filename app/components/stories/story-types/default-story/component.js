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
		var dasherizedStoryName = s.strRightBack(this.__proto__._debugContainerKey, "/");
		this.set(dasherizedStoryName,'');
		this.attributeBindings.push(dasherizedStoryName);
	}
});


