/* global ) */
import Ember from 'ember';

export default Ember.Component.extend({
        title: 'Sample Chart Line',
        subTitle: 'Testing chart data',
        storyModel: null,
        chartType: 'line',
        
        chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        chartSeries: [
                [1, 5, 2, 5, 4, 3],
                [2, 3, 4, 8, 1, 2],
                [5, 4, 3, 2, 1, 0.5]
        ],
        chartData: Ember.computed('chartSeries', 'chartLabels', {
                get() {
                        return {
                                labels: this.get('chartLabels'),
                                series: this.get('chartSeries')
                        }
                }
        }),



        chartOptions: {
                low: 0,
                showArea: true,
                showPoint: false,
                fullWidth: true
        },

        model: Ember.computed.alias('storyModel'),
        config: Ember.computed.alias('storyModel.config'),

        onInit: function () {
                this.get('storyModel');
                this.get('storyModel.config');
                this.set('storyModel', this.store.createRecord('story'));
        }.on('init'),
        


        onStoryModelChanged: function () {
                if (!Ember.isEmpty(this.get('storyModel'))) {
                        this.setupEditableFields();
                }
        }.observes('model'),

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
                story.addConfigItem({ 
                        name: 'chartSeriesData', 
                        type: 'textarea', 
                        value: '', 
                        placeholder: 'Enter a URL' });
                story.addConfigItem({ 
                        name: 'chartType', 
                        type: 'select', 
                        value: '',
                        options: [
                                { id:'line', title:'Line'},
                                { id:'bar', title:'Bar'},
                                { id:'pie', title:'Pie'}
                        ]
                        });
        },

        onConfigChange: function () {
                Ember.run.debounce(this, this.refreshChartFromConfigData, 600);
        }.observes('storyModel.config.@each.value'),

        refreshChartFromConfigData: function () {
                var config = this.get('storyModel.config');
                var seriesConfig = config.findBy('name', 'chartSeriesData');
                if (!Ember.isEmpty(seriesConfig)) {
                        var series = seriesConfig.get('value');
                        try {
                                var data = JSON.parse(series);
                                if (!Ember.isEmpty(data) &&     	
                                        Ember.isArray(data) && 
                                        data.length > 0
                                        && data != this.get('chartSeries')) {
                                        this.set('chartSeries', data);
                                }
                        } catch (ex) {

                        }
                }
                var typeConfig = config.findBy('name', 'chartType');
                var selectedChartType = typeConfig.get('value');
                if(!Ember.isEmpty(selectedChartType)) {
                        
                        this.set('chartType', selectedChartType.id);
                }
                
        }
});
