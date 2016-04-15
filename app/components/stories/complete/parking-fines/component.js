import Ember from 'ember';
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
  initialConfig: {
    title: 'Parking Fines',
    subTitle: 'Q4 2014/15',
    width: '1',
    height: '1',
    color: 'yellow',
    viewOnly: true,
  },
});
