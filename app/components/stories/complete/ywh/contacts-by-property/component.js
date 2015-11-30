/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Contact Volume by Property', // (Provide a story title)
        subTitle: 'Properties with the most contacts', // (Provide a story subtitle)
        // author: '', (Provide the author of the story)
        
        // description: '', // (Provide a longer description of the story)
        // license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', // (Where did the data come from?)
        // feedbackEmail: '', // (Provide an email users can contact about this story)
        
        // color: 'white', // (Set the story colour)
        // width: '2', // (Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', // (Set the height of the story)
        // headerImage: '', // (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, // (Add a horizontal slider to the story)
        // scroll: true, // (Should the story vertically scroll its content?)
    },
    
    // loaded: false, // (Tell other elements that this story has loaded)
    //
    
    // Add your story-specific code here
    data: null,
    
    topContacts: [],
    
    onInsertElement: function () {
        this.queryData();
    }.on('didInsertElement'),
    
    // fetchData: function() {
    //     this.get('canvasSettings.ywQuery')
        
    //     var query = this.get('solomonUtils').codeQuery()
    // }.observes('canvasSettings.ywQuery'),

    queryData: function () {
        var _this = this,
            hebeNodeAPI = this.get('appSettings.hebeNodeAPI'),
            storyData = 'yw-contact-data?query=eyJETUEiOiJHMDg5In0=&limit=-1';
            
        this.getData(hebeNodeAPI + '/' + storyData)
            .then(function (data) {
                var properties = [];
                
                data.forEach(function (item) {
                    properties.push(
                        item['Property Number']
                    );
                });
                
                // Group repeated contacts together into same postcode
                function compressArray(original) {
                 
                    var compressed = [];
                    // make a copy of the input array
                    var copy = original.slice(0);
                 
                    // first loop goes over every element
                    for (var i = 0; i < original.length; i++) {
                 
                        var myCount = 0;    
                        // loop over every element in the copy and see if it's the same
                        for (var w = 0; w < copy.length; w++) {
                            if (original[i] == copy[w]) {
                                // increase amount of times duplicate is found
                                myCount++;
                                // sets item to undefined
                                delete copy[w];
                            }
                        }
                 
                        if (myCount > 0) {
                            var a = new Object();
                            a.value = original[i];
                            a.count = myCount;
                            compressed.push(a);
                        }
                    }
                 
                    return compressed;
                };

                var countedProperties = compressArray(properties);
                
                // Put the postcodes in descending numeric order
                countedProperties.sort(function(a, b) {
                    return parseFloat(a.count) - parseFloat(b.count);
                }).reverse();
                
                // Show only the top 5 properties
                var topProperties = countedProperties.slice(0,5);
                
                _this.set('topContacts', topProperties);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            });
    }
});
