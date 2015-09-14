/* global moment */
import DefaultStory from './../../story-types/default-story/component';

export default DefaultStory.extend({
    tagName: 'div',
    loaded: false,

    didInsertElement: function () {
        this.set('title', '');
        this.set('subTitle', '');
        this.clockInit();
    },

    clockInit: function () {
        this.set('hourHand', this.$('.hours-container'));
        this.set('minuteHand', this.$('.minutes-container'));
        this.set('secondHand', this.$('.seconds-container'));

        this.setElementRotation(this.get('secondHand'), this.getSecondDegs());
        this.setElementRotation(this.get('minuteHand'), this.getMinuteDegs());
        this.setElementRotation(this.get('hourHand'), this.getHourDegs());

        var obj = this;
        setInterval(function () { obj.addSeconds(); }, 1000);
        setInterval(function () { obj.addMinutes(); }, 60000);
        setInterval(function () { obj.moveHours(); }, 60000);

        setTimeout(() => {
            obj.set('loaded', true);
        });
    },

    getSecondDegs: function (seconds) {
        var degs = (360 / 60) * moment().second();
        return degs;
    },

    getMinuteDegs: function (minutes) {
        var degs = (360 / 60) * moment().minute();
        return degs;
    },

    getHourDegs: function (hours) {
        var hourDegs = (360 / 12);
        var degs = hourDegs * moment().hour();
        
        // account for minutes in the hour
        var minuteDegs = (hourDegs / 60) * moment().minutes();
        degs += minuteDegs;

        if (degs >= 360) {
            degs = degs - 360;
        }
        return degs;
    },

    setElementRotation: function (el, deg) {
        if(deg == 0) {
            el.removeClass('bounce');
            setTimeout(function(){ el.addClass('bounce'); },500);
            el.css({ transform: 'rotateZ(' + deg + 'deg)' })
        } else {
            el.css({ transform: 'rotateZ(' + deg + 'deg)' })
        }
    },

    addSeconds: function () {
        this.setElementRotation(this.get('secondHand'), this.getSecondDegs());
    },

    addMinutes: function () {
        this.setElementRotation(this.get('minuteHand'), this.getMinuteDegs());
    },

    moveHours: function () {
        this.setElementRotation(this.get('hourHand'), this.getHourDegs());
    }
});
