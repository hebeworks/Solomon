import StoryDefault from './../default-story/component';

export default StoryDefault.extend({
	onInserted: function () {
		var datamillUrl = this.get('Config').dataMillUrl;
		this.set('datamillUrl', datamillUrl.ensureNoEndingString('/'));
	}.on('didInsertElement')
});