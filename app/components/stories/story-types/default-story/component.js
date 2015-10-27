import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {

import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
	onInit: function () {
		var hebeNodeAPI = this.get('Config').hebeNodeAPI.ensureNoEndingString('/');
		this.set("hebeNodeAPI",hebeNodeAPI);
	}.on('init')
});


