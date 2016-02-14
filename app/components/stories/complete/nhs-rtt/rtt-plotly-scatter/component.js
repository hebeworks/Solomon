/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    chartID: hebeutils.guid(),
    initialConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
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
        viewOnly: true
    },

    getPlotly: function() {
        var _this = this;
        $.ajax({
            url: "https://cdn.plot.ly/plotly-latest.min.js",
            dataType: "script",
            cache: true
        })
        .done(function() {
            _this.drawChart();
        });
    }.on("init"),

    drawChart: function() {
        var colorPalette = ['rgb(0,0,0)', 'rgb(0,172,220)', 'rgb(213,56,128​)', 'rgb(255,191,71)'];

        var d3 = Plotly.d3;

        function normal_array( mean, stddev, size ){
            var arr = new Array(size), i;
            // from http://bl.ocks.org/nrabinowitz/2034281
            var generator = (function() {
                return d3.random.normal(mean, stddev);
            }());

            for( i=0; i< arr.length; i++ ){
                arr[i] = generator();
            }
            return arr;
        };

        var x0 = normal_array(.85, 0.05, 500);
        var y0 = normal_array(.65, 0.05, 300);
        var x1 = normal_array(.85, 0.05, 2000);
        var y1 = normal_array(.65, 0.05, 300);
        var x2 = normal_array(.85, 0.05, 2000);
        var y2 = normal_array(.65, 0.05, 300);
        var x3 = normal_array(.85, 0.05, 2000);
        var y3 = normal_array(.65, 0.05, 300);        

        var trace1 = {
            name: "North",
            showLegend: true,
            mode: 'markers',
            marker: {
                color: colorPalette[1],
                size: 4
            },
            
            x: x0,
            y: y0,
            //x: ['< 18 weeks','18 - 26 weeks','26-40 weeks','40 - 52 weeks','+52 weeks'],
            //y: [.95, .94, .90, .86, .80, .74, .78, .75, .70, .69, .67, .60],
            type: 'scatter'
        };

        var trace2 = {
            name: "Midlands",
            showLegend: true,
            mode: 'markers',
            marker: {
                color: colorPalette[2],
                size: 4
            },
            
            x: x1,
            y: y1,
            //x: ['< 18 weeks','18 - 26 weeks','26-40 weeks','40 - 52 weeks','+52 weeks'],
            //y: [.95, .94, .90, .86, .80, .74, .78, .75, .70, .69, .67, .60],
            type: 'scatter'
        };

        var trace3 = {
            name: "London",
            showLegend: true,
            mode: 'markers',
            marker: {
                color: colorPalette[3],
                size: 4
            },
            
            x: x2,
            y: y2,
            //x: ['< 18 weeks','18 - 26 weeks','26-40 weeks','40 - 52 weeks','+52 weeks'],
            //y: [.95, .94, .90, .86, .80, .74, .78, .75, .70, .69, .67, .60],
            type: 'scatter'
        };

        var trace4 = {
            name: "South",
            showLegend: true,
            mode: 'markers',
            marker: {
                //color: colorPalette[4],
                size: 4
            },
            
            x: x3,
            y: y3,
            //x: ['< 18 weeks','18 - 26 weeks','26-40 weeks','40 - 52 weeks','+52 weeks'],
            //y: [.95, .94, .90, .86, .80, .74, .78, .75, .70, .69, .67, .60],
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
                tickformat: "%",
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
            ]
        };

        var data = [trace1, trace2, trace3, trace4];

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
    }
});
