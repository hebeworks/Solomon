import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'council-tax TITLE');
        this.set('subTitle', 'council-tax SUB TITLE');
//        this.fetchData();
    },
    fetchData: function() {
//        Ember.$.getJSON('http://thecitytalking.com/content/?format=json&callback=?').then((data) => {
//            data.items.forEach((item) => {
//                // format API data here
//                item.date = moment(item.publishOn).format('MMMM DD, YYYY');
//                item.url = 'http://thecitytalking.com' + item.fullUrl;
//                item.excerpt = this.stripHTML(item.excerpt).substring(0, 100) + '...';
//            });
//            this.set('items', data.items);
//            setTimeout(() => {
//                this.set('loaded', true);
//            });
//        });
    },
//    stripHTML: function(html) {
//        var div = document.createElement("div");
//        div.innerHTML = html;
//        return div.textContent || div.innerText || "";
//    }
});
