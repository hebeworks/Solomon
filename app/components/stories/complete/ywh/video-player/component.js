/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },
    
    _videoSrcUser: null,
    videoSrcUser: Ember.computed('_videoSrcUser', {
        get: function() {
            return this.get("_videoSrcUser");
        },
        set: function(key, newVal) {
            this.set('_videoSrcUser', newVal);
            return newVal;
        }
    }),
    
    usableVideoSrc: 'https://www.youtube.com/embed/RuqGv-NRoRU',
    // https://www.youtube.com/embed/RuqGv-NRoRU
    
    // didInsertElement: function() {
    //     this.constructVideoUrl();
    // },
    
    constructVideoUrl: function(video) {
        var ytUrl = 'https://www.youtube.com/embed/';
        console.log('video: ' + video);
            
        var videoId = video.split('/').pop();
                
        this.set('usableVideoSrc', ytUrl + videoId);
        
        console.log('Usable Video Src: ' + this.get('usableVideoSrc'));
    },
    
    actions: {
        addVideo: function () {
            this.constructVideoUrl(this.get('videoSrcUser'));
            // console.log(this.get('videoSrcUser'));
        }
    }
});