import Ember from 'ember';

export default Ember.Component.extend({
    title: 'C3 Test',
    subTitle: 'Multiple chart types',
    graphParams: {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            type: 'bar',
            colors: {
                data1: '#7ED321',
                data2: '#2980B9'
            }
        }
    }
});
