/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component'

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    initialConfig: {
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
    
    usableVideoSrc: 'https://www.youtube.com/embed/-VCAwsWli5g?rel=0&amp;',
    // https://www.youtube.com/embed/Ile-FwNEafk
    
    // didInsertElement: function() {
    //     this.constructVideoUrl();
    // },
    
    constructVideoUrl: function(video) {
        var ytUrl = 'https://www.youtube.com/embed/',
            videoId = video.split('/').pop(),
            queryString = '?rel=0&amp;showinfo=0';
                
        this.set('usableVideoSrc', ytUrl + videoId + queryString);
    },
    
    actions: {
        addVideo: function () {
            this.constructVideoUrl(this.get('videoSrcUser'));
        }
    }
});
