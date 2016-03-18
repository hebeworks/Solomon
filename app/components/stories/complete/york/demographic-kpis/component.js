import BaseRAGTile from 'hebe-dash/components/stories/complete/base-rag-tile/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default BaseRAGTile.extend(EditableFields, {
    chosenKpi: null, // will be altered by a select box when editing the story
    usableKpis: null,
    displayableKpis: [
        {
            id: 'BSC03',
            description: 'of residents feel it\'s important for them to feel part of their local community',
            short: false
        },
        {
            id: 'BSC04',
            description: 'of residents feel it\'s important they can influence decisions in their local area',
            short: false
        },
        {
            id: 'BYS001',
            description: 'of residents agree they can influence decisions in their local area',
            short: false
        },
        {
            id: 'BYS053',
            description: 'of residents are satisfied with their local area as a place to live',
            short: false
        },
        {
            id: 'BYS079',
            description: 'of residents agree that they belong to their local area',
            short: false
        },
        {
            id: 'BYS105',
            description: 'of residents feel people of different backgrounds get on well in their local area',
            short: false
        },
        {
            id: 'BYS131',
            description: 'of residents agree that York is a safe city to live in',
            short: false
        },
        {
            id: 'BYS254',
            description: 'of residents volunteer at least once a month',
            short: false
        },
        {
            id: 'BYS300',
            description: 'of residents agree that their local area is a safe place to live',
            short: false
        },
        {
            id: 'BYS301',
            description: 'of residents feel CYC & partners do well at reducing crime & anti-social behaviour',
            short: false
        },
        {
            id: 'BYS302',
            description: 'of residents feel CYC & partners are working well to make communities safer',
            short: false
        },
        {
            id: 'PHOF15',
            description: 'of adult social care users have as much social contact as they would like',
            short: false
        },
        {
            id: 'PHOF26',
            description: 'per 1,000 - households in temporary accommodation',
            short: false
        }
    ], // manually curated KPI descriptions. Set short to 'true' if the description is short enough to display as larger text
    selectableKpis: [
        {
            id: 'BSC03',
            text: '% of residents who feel it\'s important to feel part of their community',
        },
        {
            id: 'BSC04',
            text: '% of residents who feel it\'s important they can influence decisions in their local area',
        },
        {
            id: 'BYS001',
            text: '% of residents agree who they can influence decisions in their local area',
        },
        {
            id: 'BYS053',
            text: '% of residents who are satisfied with their local area as a place to live',
        },
        {
            id: 'BYS079',
            text: '% of residents who agree that they belong to their local area',
        },
        {
            id: 'BYS105',
            text: '% of residents who feel people of different backgrounds get on well in their local area',
        },
        {
            id: 'BYS131',
            text: '% of residents who agree that York is a safe city to live in',
        },
        {
            id: 'BYS254',
            text: '% of residents who volunteer at least once a month',
        },
        {
            id: 'BYS300',
            text: '% of residents who agree that their local area is a safe place to live',
        },
        {
            id: 'BYS301',
            text: '% of residents who feel City of York Council & partners do well at reducing crime & anti-social behaviour',
        },
        {
            id: 'BYS302',
            text: '% of residents who feel City of York Council & partners are working well to make communities safer',
        },
        {
            id: 'PHOF15',
            text: '% of adult social care users who have as much social contact as they would like',
        },
        {
            id: 'PHOF26',
            text: 'Households in temporary accommodation',
        }
    ],
    shortText: 'Edit the story to choose a KPI to display',
    
    onInsertElement: function() {
        this.getData();
    }.on('didInsertElement'),
    
    getData: function() {
        var _this = this;
        var data = {
            resource_id: '04d56453-f3a5-4f19-94e0-ea1d9ddd6838', // dataset ID
        };
        
        $.ajax({
            url: 'https://data.yorkopendata.org/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            success: function(data) {
                var fullKpis = data.result.records; // Get out the actual full data
                var strippedKpis = [];
                
                // Remove data objects we don't need
                fullKpis.forEach(function(item) {
                    if (item.Total != '-' && item.Total != 'N/A' && item.Total != 'NC') {
                        strippedKpis.push({
                            id: item.Id,
                            desc: item.Indicator,
                            period: item.Year,
                            polarity: item.Polarity,
                            value: item.Total
                        });
                    }
                });
                
                // Group KPI records by KPI ID
                var groupedKpis = _.groupBy(strippedKpis, function(item) {
                    return item.id;
                });
                
                var finalKpis = {};
                
                // Use this grouped list and create singular KPI objects with exactly what we need
                for(var id in groupedKpis) {
                    var items = groupedKpis[id];
                    
                    // Use the second year of the period so we can find the previous period data
                    items = _.sortBy(items,function(obj){
                        return parseInt(obj.period.substr(obj.period.indexOf('/') + 1));
                    });
                    items.reverse();
                    
                    var firstItem = items[0];

                    finalKpis[id] = {
                        desc: firstItem.desc,
                        polarity: firstItem.polarity,
                        currentVal: firstItem.value,
                        currentPeriod: firstItem.period
                    }
                    
                    if(items.length > 1) {
                        finalKpis[id].previousVal = items[1].value;
                        finalKpis[id].previousPeriod = items[1].period;
                    }
                    
                    // This KPI has percentages listed as floats, so lets put '%' back on
                    if (id == 'PHOF15') {
                        finalKpis[id].currentVal = parseInt(firstItem.value) + '%';
                        finalKpis[id].previousVal = parseInt(items[1].value) + '%';
                    }
                }
                
                _this.set('usableKpis', finalKpis);
                
                setTimeout(function () {
                    _this.set('loaded', true);
                });
            }
        });
    },
    
    showKpi: function() {
        var _this = this,
            kpis = _this.usableKpis;
        
        for (var id in kpis) {
            if (id == _this.chosenKpi) {
                _this.set('currentValue', kpis[id]['currentVal']);
                _this.set('previousValue', kpis[id]['previousVal']);
                _this.set('previousPeriod', kpis[id]['previousPeriod']);
                
                _this.displayableKpis.forEach(function(item) {
                    if (item.id == id) {
                        if (item.short == true) {
                            _this.set('shortText', item.description);
                            _this.set('longText', null);
                        } else {
                            _this.set('longText', item.description);
                            _this.set('shortText', null);
                        }
                    }
                });
                
                var polarity = kpis[id]['polarity'],
                    previousFloat = parseFloat(kpis[id]['previousVal']),
                    currentFloat = parseFloat(kpis[id]['currentVal']);
                    
                if (currentFloat > previousFloat) {
                    _this.set('trend', 'up');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity === 'Up is Good') {
                        _this.set('rating', 'good');
                    }
                    
                    if (polarity === 'Up is Bad') {
                        _this.set('rating', 'bad');
                    }
                    
                    if (polarity === 'Neutral') {
                        _this.set('rating', 'neutral');
                    }
                } else if (currentFloat < previousFloat) {
                    _this.set('trend', 'down');
                    Ember.run.scheduleOnce('afterRender', this, grunticon.embedSVG);
                    
                    if (polarity === 'Up is Good') {
                        _this.set('rating', 'bad');
                    }
                    
                    if (polarity === 'Up is Bad') {
                        _this.set('rating', 'good');
                    }
                    
                    if (polarity === 'Neutral') {
                        _this.set('rating', 'neutral');
                    }
                } else {
                    _this.set('rating', 'neutral');
                }
            }
        }
    }.observes('loaded', 'chosenKpi'),
    
    editableFields: function(){
        var _this = this;
        var selectableKpis = this.get('selectableKpis');
        var chosenKpi = this.get('chosenKpi');
        
        return [
            {
                name: 'displayed_kpi',
                type: 'enum',
                sourceContent: JSON.stringify(selectableKpis),
                value: chosenKpi,
                placeholder: 'Choose a KPI to show'
            }
        ];
    }.property('storyModel.config'),
    
    onKpiChanged: function () {
        var kpi = this.fetchEditableFieldValue('displayed_kpi');
        if (!Ember.isEmpty(kpi)) {
            this.set('chosenKpi', kpi);
        }
    }.on('didInsertElement').observes('storyModel.config.@each.value'),
});
