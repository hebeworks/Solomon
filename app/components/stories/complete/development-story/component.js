import Ember from 'ember';
import DatamillStory from 'hebe-dash/components/stories/story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    loaded: false,

    didInsertElement: function () {
        this.set('title', 'Development Story');
        this.set('subTitle', 'Test Datasets');

        var obj = this;
        var datasets = [
            //            {
            //                // LEEDS MARKETS
            //                id: '685d4101-8185-4dee-a653-016619f8da91',
            //                name: 'markets'
            //            },
            //            {
            //                // ROAD TRAFFIC ACCIDENTS 2014
            //                id: 'fa7bb4b9-e4e5-41fd-a1c8-49103b35a60f',
            //                name: 'RTA 2014'
            //            }
            //            ,
            //            {
            //                // PRIVATE SECTOR EMPTY PROPERTIES
            //                id: 'b606afe8-06ab-4bda-9fde-8528e0699215',
            //                name: 'EMPTY PROPERTIES'
            //            }
            //            {
            //                // MARKETS
            //                //http://www.leedsdatamill.org/api/action/datastore_search_sql?sql=SELECT * from "685d4101-8185-4dee-a653-016619f8da91"  limit 5 WHERE date "2009-03-02T00:00:00"
            //                id: '685d4101-8185-4dee-a653-016619f8da91',
            //                name: 'Leeds Markets'
            //            }
            {
                // FOI
                id: '46959102-1e33-4006-9480-02064153741d',
                name: 'FOI'
            }
        ];

        datasets.forEach(function (dataset) {
            obj.fetchDataset(dataset.id, dataset.name);
        });

        this.set('totalDatasets', datasets.length);

    },

    fetchDataset: function (resourceID, name) {
        var obj = this;
        //        var data = {
        //            sql: 'SELECT * from "' + resourceID + '"'
        //        }
        
        var dataMillDataAPI = this.get('dataMillDataAPI');
        Ember.$.getJSON(dataMillDataAPI + '/api/action/datastore_search_sql?sql=SELECT * from "' + resourceID + '" LIMIT 10').then(function (data) {
            var items = [];
            var fields = [];
            data.result.records.forEach(function (item) {
                var result = [];
                for (var prop in item) {
                    if (fields.indexOf(prop) === -1) {
                        fields.push(prop);
                    }
                    result.push(item[prop]);
                }
                items.push(result);
            });

            var datasets = obj.get('datasets');
            if (datasets == null) {
                datasets = [];
            }
            datasets.push({ name: name, fields: fields, items: items });
            obj.set('datasets', datasets);

            if (datasets.length === obj.get('totalDatasets')) {
                setTimeout(function () {
                    obj.set('loaded', true);
                });
            }
        });
    }
});
