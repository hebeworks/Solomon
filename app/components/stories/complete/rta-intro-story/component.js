/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        height: '1', // (Set the height of the story),
        color: 'dark-blue',
        viewOnly: true
    },
    
    drawStaticMap: function() {
        var url = GMaps.staticMapURL({
            size: [310, 140],
            lat: 53.7997,
            lng: -1.5492,
            zoom: 15
        });

        $('<img/>').attr('src', url).attr('spc-rta-intro_bg', '').appendTo('[solomon-story="rta-intro-story"] [cpn-story_face]');
    }.on('didInsertElement')
});
