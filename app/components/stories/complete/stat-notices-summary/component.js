/* global Ember, hebeutils, _ */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    storyConfig: {
        title: 'Notices',
        subTitle: 'Latest statutory',
        color: 'red',
        width: '1',
        height: '1',
        viewOnly: true
    },
    
    didInsertElement: function () {
        var obj = this;
//                obj.set('newlyAddedCount', 4);

        // this.getData('http://statnotices.azurewebsites.net/api/statnotices?count=true&lastmonth=true')
        this.getData('http://statnotices-preview.azurewebsites.net/api/statnotices?count=true')
            .then(function (count) {
                // Todo: how to define new?
                    // start date - so search for items newer then startDate
                obj.set('newlyAddedCount', count);
                setTimeout(() => {
                    obj.set('loaded', true);
                });
            },function(err){
                console.log('Error getting stat notice count: ' + err);
            });
    }
});
