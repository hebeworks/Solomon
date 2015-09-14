import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    className: 'story__carousel-wrapper',
    loaded: false,
    loadedChanged: function () {
        if (this.loaded) {
            this.renderCarousel();
        }
    }.observes('loaded'),
    renderCarousel: function () {

        var $el = Ember.$(this.get('element')).find('.js-story-carousel'),
            $storyPaginationControls = Ember.$(this.get('element')).find('.js-story-pagination-controls'),
            $storyFooter = $storyPaginationControls.appendTo($el.closest('.story__content').find('.story__footer')),
            $pageCounter = $storyFooter.find('.pg-of'),
            $pager = $storyFooter.find('.carousel-pager');

        $pageCounter.find('.pg-of__y').text($el.children('li').size());

        $el
            .caroufredsel({
                prev: {
                    button: $pager.find('.carousel-pager__btn.-prev')
                },
                pagination: $pager.find('.carousel-pager__numbers'),
                next: {
                    button: $pager.find('.carousel-pager__btn.-next')
                },
                swipe: {
                    onTouch: true,
                    onMouse: true
                },
                auto: false,
                scroll: {
                    onBefore: function () {
                        $el.trigger('currentPosition', function (index) {
                            $pageCounter.find('.pg-of__x').text((index + 1));
                        });
                    }
                }
            });
    }
});
