/* global Ember, hebeutils, _ */
import DefaultStory from './../../../story-types/default-story/component';


export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'TITLE: house-building/houses-started', // (Provide a story title)
        subTitle: 'SUBTITLE: house-building/houses-started', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', (Provide a longer description of the story)
        // license: '', (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        // feedbackEmail: '', (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        // width: '2', (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        // scroll: true, (Should the story vertically scroll its content?)
    },
    
    // loaded: false, (Tell other elements that this story has loaded)
    //
    
    // Add your story-specific code here
    data: null,

    onInsertElement: function () {
        this.loadData();
    }.on('didInsertElement'),

    loadData: function () {
        // how many houses were started
        // how many permanent dwellings were completed
        // by area
        // by time period
        var _this = this;
        // http://opendatacommunities.org/data/house-building/starts/tenure
        var siteDomain = "opendatacommunities.org";
        var path = ''; //data/house-building/starts/tenure';
        // var query = "SELECT * WHERE {?s ?p ?o} LIMIT 10";
        // var query = "?Local_Authority_Name ?OpenDataCommunitiesURI ?ONS_Code ?DCLGbillingAuthorityCode ?LA_Type_Label ?Authority_Type";
        var query = "SEL";
        var url = "http://" + siteDomain + path + "/sparql.json?query=";
        url += encodeURIComponent(query);
        debugger;
        
        
        
        /*
        
        var test = 'http://opendatacommunities.org'
            + '/data/house-building/starts/tenure/cube/observations.json?'
                + 'rows_dimension=http://opendatacommunities.org/'
                    + 'def/ontology/geography/refArea&columns_dimension=http://opendatacommunities.org/'
                    + 'def/ontology/time/refPeriod&measure_property=http://opendatacommunities.org/'
                    + 'def/ontology/house-building/startsObs&per_page=25&page=1&http://opendatacommunities.org/'
                    + 'def/ontology/house-building/starts/tenure=http://opendatacommunities.org/'
                    + 'def/ontology/admingeo/gssCode=http://opendatacommunities.org/'
                    + 'def/concept/house-building/starts/tenure/all/'
                    + 'def/concept/themes/geography/gssCode/E06000014'
        
                    + 'def/concept/admingeo/gssCode/E06000014'
                    def/concept/geography/ua/E06000014
                    def/concept/geography/administration/ua/E06000014
        
        */

        var path = 'http://opendatacommunities.org'
            + '/data/house-building/starts/tenure/cube/observations.json?';


        var query = 'rows_dimension=http://opendatacommunities.org/'
            + 'def/ontology/geography/refArea&columns_dimension=http://opendatacommunities.org/'
            + 'def/ontology/time/refPeriod&measure_property=http://opendatacommunities.org/'
            + 'def/ontology/house-building/startsObs&per_page=25&page=1&http://opendatacommunities.org/'
            + 'def/ontology/house-building/starts/tenure=http://opendatacommunities.org/'
            + 'def/ontology/admingeo/gssCode=http://opendatacommunities.org/'
            + 'def/concept/house-building/starts/tenure/all/'
            + 'def/concept/themes/geography/gssCode/E06000014';

        // var url = path + encodeURIComponent(query);
        var url = path + query;


        this.getData(url)
            .then(function (data) {
                alert('success: ' + data.results.bindings.length + ' results');
                console.log(data);
            });
    }


});
