/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    initialConfig:  {
        title: 'Leeds City Council',
        subTitle: 'Statement of Accounts 2014/15',
        feedbackEmail: 'support@solomon.co.uk',
        description: 'This Story has been manually coded to provide Statutory Notice of accounts.',
        license: 'Open Government License',
        author: 'Leeds Open Data',
        headerImage: '/assets/img/lcc-logo.png'
    },
    
    didInsertElement: function() {
        var obj = this;
    }
});
