import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {

import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	storyModel: null,
	onInit: function () {
		var dataMillCatAPI = this.get('Config').dataMillCatAPI.ensureNoEndingString('/');
		var dataMillDataAPI = this.get('Config').dataMillDataAPI.ensureNoEndingString('/');
		var hebeNodeAPI = this.get('Config').hebeNodeAPI.ensureNoEndingString('/');
		this.setProperties({
			dataMillCatAPI: dataMillCatAPI,
			dataMillDataAPI: dataMillDataAPI,
			hebeNodeAPI: hebeNodeAPI
		});
		this.appendComponentNameClass();
	}.on('init'),
	
	appendComponentNameClass: function() {
		this.get('classNames').push(s.strRightBack(this.__proto__._debugContainerKey,"/"));
	}

});


