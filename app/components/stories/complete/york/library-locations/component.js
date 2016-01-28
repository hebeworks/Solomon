/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Libraries in York', // (Provide a story title)
        subTitle: 'The locations of registered libraries in York', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        width: '3', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        height: '3', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    loaded: false, // (Tell other elements that this story has loaded)
    libraries: null,
    
    // Map properties
    lat: 53.9801797,
    lng: -1.0750533,
    zoom: 11,
    markers: Ember.A(),
    
    onInsertElement: function () {
        this.getData();
    }.on('didInsertElement'),

    getData: function() {
        var _this = this;
        var data = {
            resource_id: 'ff914244-101c-4ff5-b4ac-cb7b0c0795c1'
        };
        
        $.ajax({
            url: 'https://data.yorkopendata.org/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            success: function(data) {
                // console.log('Full Libraries');
                // console.log('==============');
                // console.log(data.result.records);
                // console.log('==============');
                
                var fullLibraries = data.result.records,
                    libraryCount = data.result.records.length,
                    strippedLibraries = [];

                // "﻿X" - The 'X' property has an erroneous character in it's name. The double-quoted X has this character included.
                
                fullLibraries.forEach(function(library) {
                    strippedLibraries.push({
                        id: library._id,
                        name: library.NAME,
                        type: library.TYPE,
                        address: library.ADDRESS,
                        website: library.WEBSITE,
                        email: library.EMAIL,
                        phone: library.PHONE,
                        lat: library.Y,
                        lng: library["﻿X"],
                        title: library.NAME
                    });
                });
                
                // console.log('Stripped Libraries');
                // console.log('==============');
                // console.log(strippedLibraries);
                // console.log('==============');
                
                _this.set('libraries', strippedLibraries);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            }
        })
    },
    
    setMarkers: function() {
        var _this = this;
        
        _this.markers.pushObjects(_this.libraries);
    }.observes('loaded')
});
