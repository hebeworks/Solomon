/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: 'Contact Volume by Property', // (Provide a story title)
        subTitle: 'Properties with the most contacts', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true,
    },
    
    topContacts: [],
    
    onInsertElement: function () {
        this.get('appSettings.canvasSettings.ywData');
    }.on('didInsertElement'),

    queryData: function () {
        var _this = this;
            
        var ywData = this.get('appSettings.canvasSettings.ywData');
        
        if (!Ember.isEmpty(ywData)) {
            var properties = [];
            
            ywData.forEach(function (item) {
                var propertyNumber = item['propertyNumber'],
                    justPropertyNumber = propertyNumber.replace('Property ','');
                
                properties.push(
                    justPropertyNumber
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
            var index = 1;
            
            topProperties.forEach(function(property) {
                property.index = index++
            });
            
            _this.set('topContacts', topProperties);
            
            setTimeout(function () {
                _this.set('loaded', true);
            });
        }
    }.observes('appSettings.canvasSettings.ywData')
});
