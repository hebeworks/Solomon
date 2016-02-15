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
                        names["1 Week"] = "gt_00_to_01_weeks_sum";
                        names["2 Weeks"] = "gt_01_to_02_weeks_sum";
                        names["3 Weeks"] = "gt_02_to_03_weeks_sum";
                        names["4 Weeks"] = "gt_03_to_04_weeks_sum";
                        names["5 Weeks"] = "gt_04_to_05_weeks_sum";
                        names["6 Weeks"] = "gt_05_to_06_weeks_sum";
                        names["7 Weeks"] = "gt_06_to_07_weeks_sum";
                        names["8 Weeks"] = "gt_07_to_08_weeks_sum";
                        names["9 Weeks"] = "gt_08_to_09_weeks_sum";
                        names["10 Weeks"] = "gt_09_to_10_weeks_sum";
                        names["11 Weeks"] = "gt_10_to_11_weeks_sum";
                        names["12 Weeks"] = "gt_11_to_12_weeks_sum";
                        names["13 Weeks"] = "gt_12_to_13_weeks_sum";
                        names["14 Weeks"] = "gt_13_to_14_weeks_sum";
                        names["15 Weeks"] = "gt_14_to_15_weeks_sum";
                        names["16 Weeks"] = "gt_15_to_16_weeks_sum";
                        names["17 Weeks"] = "gt_16_to_17_weeks_sum";
                        names["18 Weeks"] = "gt_17_to_18_weeks_sum";
                        names["19 Weeks"] = "gt_18_to_19_weeks_sum";
                        names["20 Weeks"] = "gt_19_to_20_weeks_sum";
                        names["21 Weeks"] = "gt_20_to_21_weeks_sum";
                        names["22 Weeks"] = "gt_21_to_22_weeks_sum";
                        names["23 Weeks"] = "gt_22_to_23_weeks_sum";
                        names["24 Weeks"] = "gt_23_to_24_weeks_sum";
                        names["25 Weeks"] = "gt_24_to_25_weeks_sum";
                        names["26 Weeks"] = "gt_25_to_26_weeks_sum";
                        names["27 Weeks"] = "gt_26_to_27_weeks_sum";
                        names["28 Weeks"] = "gt_27_to_28_weeks_sum";
                        names["29 Weeks"] = "gt_28_to_29_weeks_sum";
                        names["30 Weeks"] = "gt_29_to_30_weeks_sum";
                        names["31 Weeks"] = "gt_30_to_31_weeks_sum";
                        names["32 Weeks"] = "gt_31_to_32_weeks_sum";
                        names["33 Weeks"] = "gt_32_to_33_weeks_sum";
                        names["34 Weeks"] = "gt_33_to_34_weeks_sum";
                        names["35 Weeks"] = "gt_34_to_35_weeks_sum";
                        names["36 Weeks"] = "gt_35_to_36_weeks_sum";
                        names["37 Weeks"] = "gt_36_to_37_weeks_sum";
                        names["38 Weeks"] = "gt_37_to_38_weeks_sum";
                        names["39 Weeks"] = "gt_38_to_39_weeks_sum";
                        names["40 Weeks"] = "gt_39_to_40_weeks_sum";
                        names["41 Weeks"] = "gt_41_to_42_weeks_sum";
                        names["42 Weeks"] = "gt_40_to_41_weeks_sum";
                        names["43 Weeks"] = "gt_42_to_43_weeks_sum";
                        names["44 Weeks"] = "gt_43_to_44_weeks_sum";
                        names["45 Weeks"] = "gt_44_to_45_weeks_sum";
                        names["46 Weeks"] = "gt_45_to_46_weeks_sum";
                        names["47 Weeks"] = "gt_46_to_47_weeks_sum";
                        names["48 Weeks"] = "gt_47_to_48_weeks_sum";
                        names["49 Weeks"] = "gt_48_to_49_weeks_sum";
                        names["50 Weeks"] = "gt_49_to_50_weeks_sum";
                        names["51 Weeks"] = "gt_50_to_51_weeks_sum";
                        names["52 Weeks"] = "gt_51_to_52_weeks_sum";
                        names["+52 Weeks"] = "gt_52_weeks_sum"; 
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
                tickvals: !pathways ? ["18 Weeks", "26 Weeks","40 Weeks","52 Weeks"] : ['< 18w','18-26w','26-40w','40-52w','+52w'],
                ticktext: !pathways ? ['18 Weeks','26 Weeks','40 Weeks','52 Weeks'] : ['< 18w','18-26w','26-40w','40-52w','+52w'],
                tickmode: 'array',
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
                hoverformat: ',r'
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
