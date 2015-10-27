import StoryDefault from './../default-story/component';

export default StoryDefault.extend({
	onInit: function () {
		var dataMillCatAPI = this.get('Config').dataMillCatAPI.ensureNoEndingString('/');
		var dataMillDataAPI = this.get('Config').dataMillDataAPI.ensureNoEndingString('/');
		this.setProperties({
			dataMillCatAPI: dataMillCatAPI,
			dataMillDataAPI: dataMillDataAPI
		});
	}.on('init')
});