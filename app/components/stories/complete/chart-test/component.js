import Ember from 'ember';

export default Ember.Component.extend({
    title: 'Testing Chart Component',
    subTitle: 'Vertical bar chart',
    data: [
        {
            x:   '1',
            y: 4
        },
        {
            x:   '10',
            y: 13
        },
        {
            x:   '15',
            y: 40
        },
        {
            x:   '2',
            y: 20
        }, {
            x:   '25',
            y: 19
        },
        {
            x:   '30',
            y: 44
        }, {
            x:   '36',
            y: 57
        },
        {
            x:   '100',
            y: 37
        }
    ]
});
