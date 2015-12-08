/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
    },
    
    videoSrc: Ember.computed('videoSrc', function() {
        return this.get('videoSrc');
    }),
    usableVideoSrc: '',
    
    // didInsertElement: function() {
    //     this.constructVideoUrl();
    // },
    
    constructVideoUrl: function(video) {
        var _this = this,
            ytUrl = 'https://www.youtube.com/embed/';
            
        var videoId = video.split('/').pop();
                
        this.set('usableVideoSrc', ytUrl + videoId);
    },
    
    actions: {
        addVideo: function () {
            this.constructVideoUrl(videoSrc);
        }
    }
    
    // https://www.youtube.com/embed/RuqGv-NRoRU
});
