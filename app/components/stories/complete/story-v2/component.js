/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    storyVersion: 2,
    didInsertElement: function() {
        this.set('title', 'Story V2');
        this.set('subTitle', 'This is a story based on the V2 structure.');
        var obj = this;
        // datamillUrl is a property containing the url for Leeds Data Mill
            // inherited from story-types/datamill-story
        var url = this.get('datamillUrl') + '/api/action/datastore_search?resource_id=c2bb0c3e-52fd-4183-8727-6b9f40b829f0';
        // getData is a function inherited from 
            // story-types/default-story (which story-types/datamill-story extends)
            // it provides an easy way to make AJAX requests
            // returning a Promise (.then())
                // to which you can pass
                // success, failure, and complete callbacks
        this.getData(url)
            .then(
                function(data){
                    // success
                    console.log('story-v2 > getData > success');
                    // data is the response Object/Array from the AJAX request
                    var items = [];
                    data.result.records.forEach((tmpItem) => {
                        var id = hebeutils.guid();
                        var item = {
                            id: id,
                            street: tmpItem.Street,
                            ward: tmpItem.Ward,
                            lat: (tmpItem.Lat == null ? tmpItem["Lat "] : tmpItem.Lat),
                            lng: tmpItem.Long,
                            type: tmpItem.Type,
                            colour: tmpItem.Colour
                        };
        
                        items.push(item);
                    });
                    obj.set('items', items);
                    setTimeout(() => {
                        obj.set('loaded', true);
                    });
                },
                function(error) {
                    // failure
                    console.log('story-v2 > getData > error: ' + error);
                },
                function(){
                    // complete
                }
            )
    }
});
