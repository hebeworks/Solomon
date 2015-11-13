/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,
    data: null,
    
    onInsertElement: function () {
        this.set('title', '<%= dasherizedModuleName %> TITLE');
        this.set('subTitle', '<%= dasherizedModuleName %> SUB TITLE');
        this.loadData();
    }.on('didInsertElement'),

    loadData: function () {
        var _this = this;
        var url = 'http://'; // add any API url that returns JSON
        this.getData()
            .then(
                function(data){
                    var items = data; // the JSON returned from the API call is available here
                    this.set('items',items); // set properties on the Ember component to make them available in the template
                    setTimeout(() => { _this.set('loaded', true); });
                },
                function(err){ console.log(err); }
            )
    }
});
