/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    chartID: hebeutils.guid(),
    initialConfig: {
        title: '', 
        subTitle: '',
        author: 'Simon Zimmerman',
        description: '',
        license: '',
        feedbackEmail: 'support@hebeworks.com',
        width: '3',
        scroll: false,
        viewOnly: true
    },
    plotlyLoaded: false,
    getPlotly: function() {
        var _this = this;
        this.get('nhsFilter');
        $.ajax({
            url: "https://cdn.plot.ly/plotly-latest.min.js",
            dataType: "script",
            cache: true
        })
        .done(function() {
            _this.set('plotlyLoaded',true);
        });
    }.on("init"),
    nhsFilter: Ember.computed.alias('appSettings.canvasSettings.nhsFilter'),
    loadData: function() {
        if(this.get('plotlyLoaded') 
            && !Ember.isEmpty(this.get('nhsFilter.selectedRegion')) 
            && !Ember.isEmpty(this.get('nhsFilter.selectedMonth'))) {
            var _this = this;
            var regionID = this.get('nhsFilter.selectedRegion.id');
            var month = this.get('nhsFilter.selectedMonth.id');
            var url = this.get('appSettings.hebeNodeAPI') + '/nhsrtt/region-month/ccgs'
                + '?regionid=' + regionID
                + '&month=' + month;
            this.getData(url)
                .then(function(data){
                    _this.set('chartData',data);
                    _this.drawChart();  
                });
        }
    }.observes(
        'plotlyLoaded',
        'nhsFilter.selectedRegion',
        'nhsFilter.selectedMonth'
        ),
    drawChart: function() {
        var colorPalette = ['rgb(0,0,0)', 'rgb(0,172,220)', 'rgb(213,56,128​)', 'rgb(255,191,71)'];
        var d3 = Plotly.d3;
        var ccgs = this.get('nhsFilter.ccgs');
        var providers = this.get('nhsFilter.providers');
        var chartData = this.get('chartData');
        var traces = [];
        traces.push(buildTrace(ccgs,chartData.ccgs));
        traces.push(buildTrace(providers,chartData.providers));
        function buildTrace(names,items){
            var trace = {
                x1 : [],
                y1 : [],
                labels : []
            };
            var prop = null;
            function findCCG(item){ 
                return item._id === prop;
            }
            for(prop in items) {
                trace.x1.push((items[prop].part1.percentage));
                trace.y1.push((items[prop].part2.percentage));
                var ccg = _.find(names,findCCG);
                trace.labels.push(ccg.name);
            }
            return trace;
        };
        var trace1 = {
            name: "CCGs",
            showLegend: true,
            mode: 'markers',
            marker: {
                color: colorPalette[1],
                size: 5
            },
            hoverinfo: "x+y+text",
            text: traces[0].labels,
            x: traces[0].x1,
            y: traces[0].y1,
            type: 'scatter'
        };
        var trace2 = {
            name: "Providers",
            showLegend: true,
            visible: "legendonly",
            mode: 'markers',
            marker: {
                color: colorPalette[2],
                size: 5
            },
            hoverinfo: "x+y+text",
            text: traces[1].labels,
            y: traces[1].y1,
            x: traces[1].x1,
            type: 'scatter'
        };
        var layout = {
            margin: {
                l: 50,
                r: 30,
                b: 40,
                t: 10,
                pad: 0
            },
            font: {
                family: "Roboto, Open Sans, verdana, sans-serif",
                size: 10,
                color: colorPalette[0],
            },
            legend: {
                yanchor:"middle",
                y:.5,
                traceorder: 'normal',
                font: {
                  family: "Roboto, Open Sans, verdana, sans-serif",
                  size: 12,
                  color: '#000'
                },
            },
            xaxis: {
                title: "Complete",
                titlefont: {
                  family: 'Roboto, Open Sans, verdana, sans-serif',
                  size: 12,
                  color: '#000'
                },
                showgrid: false,
                ticklen: 2,
                tickwidth: 1,
                tickformat: "%",
                showline: true,
                line:{
                    width: 2,
                    color: '#000'
                }
            },
            yaxis: {
                title: "Incomplete",
                titlefont: {
                  family: 'Roboto, Open Sans, verdana, sans-serif',
                  size: 12,
                  color: '#000'
                },
                showgrid: false,
                ticklen: 2,
                tickwidth: 1,
                tickformat: "%",
                showline: true,
                line:{
                    width: 2,
                    color: '#000'
                }
            },
            hovermode: "closest",
            //dragmode: "select",
            textposition: 'top left',
            // shapes: [
            //     {
            //         type: 'rect',
            //         x0: 0.90,
            //         x1: 1,
            //         y0: 0.90,
            //         y1: 1,
            //         fillcolor: 'rgba(114, 187, 0, 0.4)',
            //         line: {
            //             width: 0,
            //         }
            //     }
            // ]
        };
        var data = [trace1,trace2];
        Plotly.newPlot(this.get('chartID'), data, layout, {
            
            // no interactivity, for export or image generation
            //staticPlot: false,
            
            // we can edit titles, move annotations, etc
            //editable: false,
            
            // plot will respect layout.autosize=true and infer its container size
            autosizable: true,
            
            // if we DO autosize, do we fill the container or the screen?
            fillFrame: false,
            
            // if we DO autosize, set the frame margins in percents of plot size
            //frameMargins: 0,
            
            // mousewheel or two-finger scroll zooms the plot
            scrollZoom: false,
            
            // double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
            //doubleClick: 'reset+autosize',
            
            // new users see some hints about interactivity
            showTips: false,
            
            // link to open this plot in plotly
            //showLink: false,
            
            // if we show a link, does it contain data or just link to a plotly file?
            //sendData: true,
            
            // text appearing in the sendData link
            //linkText: 'Edit chart',
            
            // false or function adding source(s) to linkText <text>
            //showSources: false,
            
            // display the mode bar (true, false, or 'hover')
            //displayModeBar: 'hover',
            
            // remove mode bar button by name
            // (see ./components/modebar/buttons.js for the list of names)
            // (see https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js)
            modeBarButtonsToRemove: [
                'toImage',
                'sendDataToCloud',
                //'zoom2d',
                //'pan2d',
                'select2d',
                'lasso2d',
                'zoomIn2d',
                'zoomOut2d',
                'autoScale2d',
                //'resetScale2d',
                'hoverClosestCartesian',
                'hoverCompareCartesian',
                ],
            
            // add mode bar button using config objects
            // (see ./components/modebar/buttons.js for list of arguments)
            //modeBarButtonsToAdd: [],
            
            // fully custom mode bar buttons as nested array,
            // where the outer arrays represents button groups, and
            // the inner arrays have buttons config objects or names of default buttons
            // (see ./components/modebar/buttons.js for more info)
            // modeBarButtons: false,
            
            // add the plotly logo on the end of the mode bar
            displaylogo: false,
            
            // increase the pixel ratio for Gl plot images
            //plotGlPixelRatio: 2,
            
            // function to add the background color to a different container
            // or 'opaque' to ensure there's white behind it
            //setBackground: defaultSetBackground,
            
            // URL to topojson files used in geo charts
            //topojsonURL: 'https://cdn.plot.ly/'
        });
    }
});
