import Ember from 'ember';
// import { DashComponentBase } from 'hebe-dash/mixins/dash-component-base';
// export default Ember.Component.extend('DashComponentBase', {

import dashComponentBase from 'hebe-dash/mixins/dash-component-base';

export default Ember.Component.extend(dashComponentBase, {
    storyModel: null,
    storyConfig: {},
    onDefaultStoryInit: function () {
        this.appendComponentNameClass();
        this.set('storyConfig', Ember.Object.create(this.get('initialConfig')));
    }.on('init'),

    appendComponentNameClass: function () {
        const dasherizedStoryName = s.strRightBack(Object.getPrototypeOf(this)._debugContainerKey, "/");
        this.set('solomon-story', dasherizedStoryName);
        this.attributeBindings.push('solomon-story');
    }
});


