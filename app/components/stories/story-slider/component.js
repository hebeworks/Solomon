import Ember from 'ember';

export default Ember.Component.extend({

    'cpn-story_carousel': '',

    tagName: 'div',

    className: 'story__carousel-wrapper',

    attributeBindings: 'cpn-story_carousel',

    width: 2,

    loaded: false,

    viewOnly: false,

    loadedChanged: function (){
        this.get('loaded') ? this.setupCarousel() : this.teardownCarousel();
    }.observes('loaded'),

    setupCarousel: function (){
        var $element = this.$('[cpn-story_carousel-list]');
        var $content = $element.closest('[cpn-story_content]');
        var $storyPaginationControls = this.$('.js-story-pagination-controls');
        var $storyPaginationParent = $content.find(this.get('viewOnly') ? '[cpn-story_body]' : '[cpn-story_footer]');
        var $storyFooter = $storyPaginationControls.appendTo($storyPaginationParent);
        var $pageCounter = $storyFooter.find('.pg-of')
        var $pager = $storyFooter.find('.carousel-pager');

        $pageCounter.find('.pg-of__y').text($element.children('li').size());
        $element.caroufredsel({
            width: 310,
            height: 234,
            auto: false,
            pagination: $pager.find('.carousel-pager__numbers'),
            prev: {
                button: $pager.find('.carousel-pager__btn.-prev')
            },
            next: {
                button: $pager.find('.carousel-pager__btn.-next')
            },
            swipe: {
                onTouch: true,
                onMouse: true
            },
            scroll: {
                onBefore: function () {
                    $element.trigger('currentPosition', function (index) {
                        $pageCounter.find('.pg-of__x').text(index + 1);
                    });
                }
            }
        });
    },

    teardownCarousel: function(){
        this.$('[cpn-story_carousel-list]').trigger("destroy");
    }

});
