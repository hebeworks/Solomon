import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    numberOfPages: 1,
    didInsertElement: function() {
        this.set('title', 'Instagram');
        this.set('subTitle', 'Pictures of Leeds on Instagram');
        this.fetchData();
    },
    fetchData: function() {
        var client_id = 'd2aa97687743475784ecef07442f2e7b';
        var latitude=53.7997;
        var longitude=1.5492;

        //var test = btoa('https://api.instagram.com/v1/media/search?lat=53.7997&lng=1.5492&client_id=d2aa97687743475784ecef07442f2e7b');
        //console.log(test);
        //test = atob(test);
        //console.log(test);

        //var url = 'https://api.instagram.com/v1/media/search?lat='+latitude+'&lng='+longitude+'&client_id='+client_id;
        var url = 'http://hebenodeapi.azurewebsites.net/instagram';
            var obj = this;
            Ember.$.ajax({
                url: url,
                type: 'GET',
                crossOrigin: true
            })
            .then(function(data) {
                var photos = [];
                var itemsPerPage = 12;
                var pages = obj.get('numberOfPages');
                var i = 0;
                data.data.forEach(function(item) {
                    // format API data here
                    if(i < itemsPerPage * pages){
                        if(item.type == 'image'){
                            var photo = {};
                            photo.location = item.location;
                            photo.created = moment(item.created_time);
                            photo.link = item.link;
                            photo.images = item.images;
                            photo.caption = (item.caption != null ? item.caption.text : '');
                            photo.id = item.id;
                            photo.likes = (item.likes != null ? item.likes.count : 0);
                            photo.comments = (item.comments != null ? item.comments.count : 0);
                            photos.push(photo);
                            i++;
                        }

                        //"location": {
                        //    "latitude": 53.796403333,
                        //    "name": "crafthouse",
                        //    "longitude": 1.5435,
                        //    "id": 522971682
                        //},

                        //"images": {
                        //    "low_resolution": {
                        //        "url": "https:\/\/scontent.cdninstagram.com\/hphotos-xfa1\/t51.2885-15\/s306x306\/e15\/10903556_350828428437167_1775381435_n.jpg",
                        //        "width": 306,
                        //        "height": 306
                        //    },
                        //    "thumbnail": {
                        //        "url": "https:\/\/scontent.cdninstagram.com\/hphotos-xfa1\/t51.2885-15\/s150x150\/e15\/10903556_350828428437167_1775381435_n.jpg",
                        //        "width": 150,
                        //        "height": 150
                        //    },
                        //    "standard_resolution": {
                        //        "url": "https:\/\/scontent.cdninstagram.com\/hphotos-xfa1\/t51.2885-15\/e15\/10903556_350828428437167_1775381435_n.jpg",
                        //        "width": 640,
                        //        "height": 640
                        //    }
                        //},


                    }
                });
                obj.set('items', photos);
                setTimeout(function() {
                    obj.set('loaded', true);
                });
            });
    },
    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});
