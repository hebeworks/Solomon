/* global ) */
import Ember from 'ember';

export default Ember.Component.extend({
        chartData: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                series: [
                        [1, 5, 2, 5, 4, 3],
                        [2, 3, 4, 8, 1, 2],
                        [5, 4, 3, 2, 1, 0.5]
                ]
        },
        chartOptions: {
                low: 0,
                showArea: true,
                showPoint: false,
                fullWidth: true
        },

        model: Ember.computed('storyModel', {
                get() {
                        return this.get('storyModel');
                }
        }),

        onInit: function () {
                this.set('storyModel', this.store.createRecord('story'));
        }.on('init'),

        onStoryModelChanged: function () {
                alert('onStoryModelChanged');
                if (!Ember.isEmpty(this.get('storyModel'))) {
                        this.setupEditableFields();
                }
        }.observes('storyModel'),

        onChartChanged: function () {
                var chart = this.get('chart');
                if (this.get('chart') != null) {
                        chart.on('draw', function (data) {
                                if (data.type === 'line' || data.type === 'area') {
                                        data.element.animate({
                                                d: {
                                                        begin: 2000 * data.index,
                                                        dur: 2000,
                                                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                                        to: data.path.clone().stringify(),
                                                        easing: Chartist.Svg.Easing.easeOutQuint
                                                }
                                        });
                                }
                        });
                }
        }.observes('chart'),

        setupEditableFields: function () {
                var story = this.get('storyModel');
                if (!Ember.isEmpty(story)) {
                        story.addConfigItem({
                                name: 'chartSeriesData',
                                type: 'textarea',
                                value: '',
                                placeholder: 'Enter chart data series data e.g. "[\n[1, 5, 2, 5, 4, 3],\n\r[2, 3, 4, 8, 1, 2],<br/ >[5, 4, 3, 2, 1, 0.5]<br/ >]'
                        });
                }
        },

        onConfigChange: function () {
                this.refreshChartFromConfigData();
                // SAVE Canvas
                // this.set('action', 'saveCanvasState');
                // this.sendAction('action');
        }.observes('storyModel.config.[]].value'),

        refreshChartFromConfigData: function () {
                var config = this.get('storyModel.config');
                var seriesConfig = config.findBy('name', 'chartSeriesData');
                if (!Ember.isEmpty(seriesConfig)) {
                        var series = seriesConfig.get('value');
                        if (!Ember.isEmpty(series)) {
                                this.set('chartData.series', series);
                        }
                }
        },
});
