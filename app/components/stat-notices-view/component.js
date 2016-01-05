/* global Ember, _ */
import DefaultStory from './../stories/story-types/default-story/component';

export default DefaultStory.extend({

    mapStyle: function () {
        var styles = this.Config.APP.googleMapStyles.default;
        return styles;
    }.property(),


    legislationURI: function () {
        //"legislationTitle": "Licensing Act 2003",
        //"legislationSection": "17",
        //"legislationSubSec1": "3",
        //"legislationSubSec2": "",
        //"legislationURI": "http://www.legislation.gov.uk/ukpga/2003/17/contents",

        return this.get('model.legislationURI')
            .replace('/contents', '')
            + '/section/' + this.get('model.legislationSection')
            + '/' + this.get('model.legislationSubSec1')
            + '/notes/data.xml';
    }.property('model'),




    citationValue: null,
    citation: Ember.computed('legislationURI', 'citationValue', {
        get: function () {
            var url = this.get('legislationURI');
            url = hebeutils.Base64.encode(url);
            var obj = this;
            var hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
            this.getData(hebeNodeAPI + '/apiproxy?url=' + url + '&toJSON=true')
                .then(function (data) {
                // debugger;
                var myVal = 'test';
                obj.set('citationValue', myVal);
                return myVal;
            });
            return this.get('citationValue');
        },
        set: function (key, value) {
            if (this.get('citationValue') != value) {
                this.set('citationValue', value);
            }
            return value;
        }
    })
    //.observes('legislationURI', 'citationValue')



});
