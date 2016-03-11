/* global Ember, hebeutils, _ */
import DatamillStory from '../../story-types/datamill-story/component';

export default DatamillStory.extend({
    initialConfig: {
        title: 'Statutory Notices',
        subTitle: 'Newly added in Leeds',
        color: 'lighter-blue',
        dataSourceUrl: 'http://leedsdatamill.org',
        feedbackEmail: 'simon@hebeworks.com',
        description: 'This Story uses Statutory Notices data supplied by Licencing and Planning teams from Leeds City Council.',
        license: 'Open Government License',
        author: 'Nathan Smith'
    },
    
    didReceiveAttrs: function () {
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
