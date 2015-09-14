/* global Ember, hebeutils, _ */
import DatamillStory from '../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,
    didReceiveAttrs: function () {
        this.set('title', 'Statutory Notices');
        this.set('subTitle', 'Newly added in Leeds');
        var obj = this;
        var statnoticeURL = this.get('Config').statnoticeURL;
        var url = statnoticeURL + '/api/statnotices?type=Planning&count=true';//&lastmonth=true';
        this.getData(url).then(function (count) {
            obj.set('planningTotal', count);
            setTimeout(() => {
                obj.set('loaded', true);
            });
        });
        url = statnoticeURL + '/api/statnotices?type=Licensing&count=true';//&lastmonth=true';
        this.getData(url).then(function (count) {
            obj.set('licensingTotal', count);
            setTimeout(() => {
                obj.set('loaded', true);
            });
        })
    }
});
