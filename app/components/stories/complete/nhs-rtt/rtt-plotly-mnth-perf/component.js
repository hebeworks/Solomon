/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    chartID: hebeutils.guid(),
    chartData: null,
    storyConfig: {
        title: 'RTT Performance by Month', // (Provide a story title)
        subTitle: 'Monthly performance against standard', // (Provide a story subtitle)
        author: 'Simon Zimmerman',
        
        description: '', // (Provide a longer description of the story)
        license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com', // (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        width: '3', //(Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
    },
	nhsFilter: Ember.computed.alias('appSettings.canvasSettings.nhsFilter'),

    getPlotly: function() {
        var _this = this;
        $.ajax({
            url: "https://cdn.plot.ly/plotly-latest.min.js",
            dataType: "script",
            cache: true
        })
        .done(function() {
            _this.loadData();
        });
    }.on("init"),

    loadData: function() {
        var _this = this;
        var regionCode = this.get('nhsFilter.selectedRegion._id');
        var url = this.get('appSettings.hebeNodeAPI') + '/nhsrtt/monthly/regions/' + regionCode;
        this.getData(url)
            .then(function(data) {
                _this.set('chartData',data);
            });
    }.observes('nhsFilter.selectedRegion'),
    
    drawChart: function() {
        var colorPalette = ['rgb(0,0,0)', 'rgb(0,172,220)', 'rgb(213,56,128​)', 'rgb(255,191,71)'];

debugger;

        var trace1 = {
            name: "2015",
            showLegend: true,
            mode: 'lines+markers',
            marker: {
                color: colorPalette[1],
                size: 2
            },
            line: {
                color: colorPalette[1],
                width: 2
            },
            x: ['2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01', '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01', '2016-12-01'],
            y: [.95, .94, .90, .86, .80, .74, .78, .75, .70, .69, .67, .60],
            type: 'scatter'
        };

        var trace2 = {
            name: "2016",
            showLegend: true,
            mode: 'lines+markers',
            marker: {
                color: colorPalette[2],
                size: 2
            },
            line: {
                color: colorPalette[2],
                width: 2
            },
            x: ['2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01', '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01', '2016-12-01'],
            y: [.40, .55, .64, .62, .75, .85, .73, .92, .99, .94, .67, .90],
            type: 'scatter'
        };

        var layout = {
            margin: {
                l: 40,
                r: 30,
                b: 30,
                t: 10,
                pad: 5
            },
            font: {
                family: "Roboto, Open Sans, verdana, sans-serif",
                size: 11,
                color: colorPalette[0],
            },
            //showlegend: false,
            legend: {
                //xanchor:"center",
                yanchor:"middle",
                y:.5,
                //x:0.5, 
                traceorder: 'normal',
                font: {
                  family: "Roboto, Open Sans, verdana, sans-serif",
                  size: 12,
                  color: '#000'
                },
            },
            xaxis: {
                showgrid: false,
                ticklen: 2,
                tickwidth: 1,
                tickformat: "%b",
                showline: true,
                line:{
                    width: 2,
                    color: '#000'
                }
            },
            yaxis: {
                showgrid: false,
                tickformat: "%",
                showline: true,
                //range: [0, 1],
            },
            textposition: 'top left',
            shapes: [
                {
                    type: 'line',
                    x0: '2016-01-01',
                    y0: 0.92,
                    x1: '2016-12-01',
                    y1: 0.92,
                    line: {
                        color: 'rgb(000, 000, 000)',
                        width: 1,
                        dash: 'dot'
                    }
                }
            ],
            annotations: [
                {
                    text: 'Standard',
                    x: '2016-12-01',
                    y: 0.92,
                    xref: 'x',
                    yref: 'y',
                    ax: 0,
                    ay: -10,
                    showarrow: true,
                    arrowsize: 0.5,
                    arrowhead: 6,
                    font: {
                        color: '#000000',
                        font: 'Roboto',
                    }
                }
            ]
        };

        var data = [trace1, trace2];

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
            scrollZoom: true,
            
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
                //'toImage',
                'sendDataToCloud',
                'zoom2d',
                'pan2d',
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
    }.observes('chartData')
});
