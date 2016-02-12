/* global Ember, hebeutils, _ */
import DefaultStory from 'hebe-dash/components/stories/story-types/default-story/component';

export default DefaultStory.extend({
    // Story settings (including default values)
    // Uncomment any setting you need to change, delete any you don't need
    chartID: hebeutils.guid(),
    storyConfig: {
        title: '', // (Provide a story title)
        subTitle: '', // (Provide a story subtitle)
        author: 'Simon Zimmerman',

        description: '', // (Provide a longer description of the story)
        license: '', // (Define which license applies to usage of the story)
        // dataSourceUrl: '', (Where did the data come from?)
        feedbackEmail: 'support@hebeworks.com', // (Provide an email users can contact about this story)
        
        // color: 'white', (Set the story colour)
        width: '4', //(Set the width of the story. If your story contains a slider, you must define the width, even if it is the same as the default.)
        // height: '2', (Set the height of the story)
        // headerImage: '', (Provide an image to show in the story header instead of the title and subtitle)
        
        // slider: false, (Add a horizontal slider to the story)
        scroll: false, // (Should the story vertically scroll its content?)
        viewOnly: true
    },

    getPlotly: function () {
        var _this = this;
        $.ajax({
            url: "https://cdn.plot.ly/plotly-latest.min.js",
            dataType: "script",
            cache: true
        })
            .done(function () {
                _this.loadData();
            });
    }.on("init"),
    
    actions: {
        showPathways:function(show){
            this.set('pathways',show);
        }
    },
pathways: true,
    loadData: function () {
        var pathways = this.get('pathways')
        
        var _this = this;
        var month = this.get('appSettings.canvasSettings.nhsFilter.selectedMonth');
        var region = this.get('appSettings.canvasSettings.nhsFilter.selectedMonth');

        // var query = 'providerid=RQM&datekey=20150930';
        var query = 'regionid=Y56&datekey=' + month.id;
        
        if(pathways == true) {
            query += '&pathways=true';
        }
        this.getData(this.get('appSettings.hebeNodeAPI') + '/nhsrtt/waitinglist?' + query)
            .then(function (data) {
                var traces = {};
                var names = {};
                switch(pathways) {
                    default:
                        names["_1"] = "gt_00_to_01_weeks_sum";
                        names["_2"] = "gt_01_to_02_weeks_sum";
                        names["_3"] = "gt_02_to_03_weeks_sum";
                        names["_4"] = "gt_03_to_04_weeks_sum";
                        names["_5"] = "gt_04_to_05_weeks_sum";
                        names["_6"] = "gt_05_to_06_weeks_sum";
                        names["_7"] = "gt_06_to_07_weeks_sum";
                        names["_8"] = "gt_07_to_08_weeks_sum";
                        names["_9"] = "gt_08_to_09_weeks_sum";
                        names["_10"] = "gt_09_to_10_weeks_sum";
                        names["_11"] = "gt_10_to_11_weeks_sum";
                        names["_12"] = "gt_11_to_12_weeks_sum";
                        names["_13"] = "gt_12_to_13_weeks_sum";
                        names["_14"] = "gt_13_to_14_weeks_sum";
                        names["_15"] = "gt_14_to_15_weeks_sum";
                        names["_16"] = "gt_15_to_16_weeks_sum";
                        names["_17"] = "gt_16_to_17_weeks_sum";
                        names["_18< 18w"] = "gt_17_to_18_weeks_sum";
                        names["_19"] = "gt_18_to_19_weeks_sum";
                        names["_20"] = "gt_19_to_20_weeks_sum";
                        names["_21"] = "gt_20_to_21_weeks_sum";
                        names["_22"] = "gt_21_to_22_weeks_sum";
                        names["_23"] = "gt_22_to_23_weeks_sum";
                        names["_24"] = "gt_23_to_24_weeks_sum";
                        names["_25"] = "gt_24_to_25_weeks_sum";
                        names["18-26w"] = "gt_25_to_26_weeks_sum";
                        names["_27"] = "gt_26_to_27_weeks_sum";
                        names["_28"] = "gt_27_to_28_weeks_sum";
                        names["_29"] = "gt_28_to_29_weeks_sum";
                        names["_30"] = "gt_29_to_30_weeks_sum";
                        names["_31"] = "gt_30_to_31_weeks_sum";
                        names["_32"] = "gt_31_to_32_weeks_sum";
                        names["_33"] = "gt_32_to_33_weeks_sum";
                        names["_34"] = "gt_33_to_34_weeks_sum";
                        names["_35"] = "gt_34_to_35_weeks_sum";
                        names["_36"] = "gt_35_to_36_weeks_sum";
                        names["_37"] = "gt_36_to_37_weeks_sum";
                        names["_38"] = "gt_37_to_38_weeks_sum";
                        names["_39"] = "gt_38_to_39_weeks_sum";
                        names["26-40w"] = "gt_39_to_40_weeks_sum";
                        names["_41"] = "gt_41_to_42_weeks_sum";
                        names["_42"] = "gt_40_to_41_weeks_sum";
                        names["_43"] = "gt_42_to_43_weeks_sum";
                        names["_44"] = "gt_43_to_44_weeks_sum";
                        names["_45"] = "gt_44_to_45_weeks_sum";
                        names["_46"] = "gt_45_to_46_weeks_sum";
                        names["_47"] = "gt_46_to_47_weeks_sum";
                        names["_48"] = "gt_47_to_48_weeks_sum";
                        names["_49"] = "gt_48_to_49_weeks_sum";
                        names["_50"] = "gt_49_to_50_weeks_sum";
                        names["_51"] = "gt_50_to_51_weeks_sum";
                        names["40-52w"] = "gt_51_to_52_weeks_sum";
                        names["+52w"] = "gt_52_weeks_sum"; 
                    break;
                    case true :
                        names['< 18w'] = "gt_00_to_18_weeks_sum";
                        names['18-26w'] = "gt_18_to_26_weeks_sum";
                        names['26-40w'] = "gt_26_to_40_weeks_sum";
                        names['40-52w'] = "gt_40_to_52_weeks_sum";
                        names['+52w'] = "gt_52_weeks_sum";
                    break;
                }



                var xValue = [];
                for (var prop in names) {
                    // xValue.push(prop.indexOf('_') == 0 ? '' : prop);
                    xValue.push(prop);
                }

                for (var i = 0; i < data.length; i++) {
                    var part = data[i];
                    var yValue = [];
                    for (var prop in names) {
                        yValue.push(part[names[prop]]);
                    }
                    var obj = {
                        x: xValue,
                        y: yValue
                    };
                    traces[part._id] = obj;
                }
                _this.drawChart(traces);
            });
    }.observes('appSettings.canvasSettings.nhsFilter.selectedMonth','pathways'),

    drawChart: function (traces) {
        var colorPalette = ['rgb(0,0,0)', 'rgb(0,172,220)', 'rgb(213,56,128​)', 'rgb(255,191,71)'];
        var pathways = this.get('pathways');
        var d3 = Plotly.d3;

        var trace1 = {
            name: "Admitted",
            //orientation: 'h',
            showLegend: true,
            marker: {
                color: colorPalette[3],
                width: 1
            },
            x: traces["PART_1A"].x, //['< 18w','18-26w','26-40w','40-52w','+52w'],
            y: traces["PART_1A"].y, //[17234, 1000, 7, 40, 0],
            type: 'bar'
        };

        var trace2 = {
            name: "Non-admitted",
            //orientation: 'h',
            showLegend: true,
            marker: {
                color: colorPalette[1],
                width: 1
            },
            x: traces["PART_1B"].x, //['< 18w','18-26w','26-40w','40-52w','+52w'],
            y: traces["PART_1B"].y, //[10000, 499, 600, 9, 1],
            type: 'bar'
        };

        var trace3 = {
            name: "Incomplete",
            showLegend: true,
            mode: 'lines+markers',
            marker: {
                color: colorPalette[2],
                size: 2
            },
            line: {
                color: colorPalette[2],
                width: 2,
                shape: 'spline',
                dash: 'dot'
            },
            x: traces["PART_2"].x, // ['< 18w','18-26w','26-40w','40-52w','+52w'],
            y: traces["PART_2"].y, // [35000, 6000, 1750, 155, 1],
            type: 'scatter'
        }

        var layout = {
            barmode: 'stack',
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
            showlegend: pathways,
            legend: {
                //xanchor:"center",
                yanchor: "middle",
                y: .5,
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
                zeroline: false,
                ticklen: 2,
                // tickvals: trace1.x,
                tickmode: 'auto',
                tickwidth: 1,
                showline: true,
                line: {
                    width: 2,
                    color: '#000'
                }
            },
            yaxis: {
                showgrid: true,
                zeroline: false,
                showline: true,
            },
            textposition: 'top left',
        };

        var data = [trace1, trace2, trace3];

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
