import Ember from 'ember';
import StoryLibraryLister from 'hebe-dash/mixins/story-library-lister';

export default Ember.Component.extend(StoryLibraryLister, {
	debouncedSearchTerm: '',
    
    didInsertElement: function() {
        this.focusSearchBox();
    },
    
    showClear: function() {
        return (this.get('debouncedSearchTerm.length') > 0);
    }.property('debouncedSearchTerm'),
	
	updateSearchTerm: function() {
        this.set('searchTerm', this.get('debouncedSearchTerm'));
    },

    updateDebouncedSearchTerm: function() {
        Ember.run.debounce(this, this.updateSearchTerm, 600);
    }.observes("debouncedSearchTerm"),
	
	// onSearchTermChanged: function () {
	// 	if (this.get('searchTerm') != null && this.get('searchTerm.length') > 0) {
	// 		this.getStories({ searchTerm: this.get('searchTerm') });
	// 	}
	// }.observes('searchTerm'),
    
    focusSearchBox: function() {
        this.$('.search__input').focus();
    },
    
    actions: {
        clearSearchTerm: function() {
            this.set('debouncedSearchTerm', '');
        }
    }
});
