import DefaultStory from '../stories/story-types/default-story/component'

export default DefaultStory.extend({
	currentFilter: {},
	filterPlace: null,
	places: null,

	onInit: function () {
		this.set('statnoticeURL', this.Config.statnoticeURL),
		this.get('places');
		this.get('filterPlace');
	}.on('init'),

	onSelectedPlaceChange: function () {
		// this.getItems();
		// 	location": {
		//   "coordinates": [
		//     53.60857506915007,
		//     -1.0128832985975176
		//   ]
		// }
		if (this.get('filterPlace') != null) {
			var location = this.get('filterPlace.location.coordinates');
			var lat = location[1];
			var lng = location[0];

			location = {
				lat: lat,
				lng: lng
			};

			// console.log('location: ' + location);

			this.set('location', location);
		} else {
			this.set('location', null);
		}
	}.observes('filterPlace'),

	getItems: function () {
		var obj = this;

		this.sendGoogleTrackingEvent('', 'StatNoticeSearch', 'Filter', this.get('filterType'));

		var query = {};
		if (this.get('filterType') != null && this.get('filterType') != "All" && this.get('filterType.length') > 0) {
			query.type = this.get('filterType');
		}

		if (this.get('location') != null) {
			query.lat = this.get('location.lat');
			query.lng = this.get('location.lng');
		}

		// console.log('filter query = ' + query);

		this.store.find('statnotice', query)
			.then(function (data) {
				obj.set('items', data);
			});

	}.observes('filterType', 'location'),

	filterTypeValue: "All",
    filterType: Ember.computed("filterType", {
		get: function () {
			// console.log('getting filterTypeValue: ' + this.get('filterTypeValue'));
			return this.get('filterTypeValue');
		},
		set: function (key, value) {
			// console.log('setting filterTypeValue: ' + value);
			if (this.get('filterTypeValue') != value) {
				this.set('filterTypeValue', value);
			}
			return value;
		}
	}),

	sendGoogleTrackingEvent: function (account, category, action, label, value) {
		console.log('sendGoogleTrackingEvent: ' + account + ' - ' + category + ' - ' + action + ' - ' + label + ' - ' + value);
		// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide	
		// account = 
		// 'UA-63204812-2'; // statnotices
		// // 'UA-63204812-1' // dashboard
		// _gaq.push(
		//   ['_setAccount', account],
		//   ['_setDomainName', 'statnotices.leedsdatamill.org'],
		//   // ['_setCustomVar', 1, 'Section', 'Life & Style', 3],
		//   // _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
		//   ['_trackEvent',category,action,label,value]
		//   // ['_trackPageview']
		// );	
		
		
		// ga('send', 'event', 'category', 'action', 'label', value);
		// ga('send', 'event', category, action, label, value);
		
		// TODO change account
		// ga(function (tracker) {
		// 	debugger;
		// 	tracker.get('account');
		// });
		
		
		ga('send', {
			'hitType': 'event',          // Required.
			'eventCategory': category,   // Required.
			'eventAction': action,      // Required.
			'eventLabel': label,
			'eventValue': value
		});
	},

	// validEmail: function(){
	// 	// todo: add hebeutils from bower to add isValidEmail function
	// 	return (!Ember.Empty(this.get('userEmail')) && this.get('userEmail').toString().isValidEmail); 
	// }.observes('userEmail'),

	actions: {
		filterByType: function (params) {
			// console.log('Stat notices: setting filterType');
			this.set('filterType', params);
		},
		findPlaces: function (query, deferred) {
			var obj = this;
			if (query != null && query.term != null && query.term.length > 3) {
				var url = obj.get('statnoticeURL') + '/api/places?searchTerm=' + query.term;
				// console.log(url);
				this.getData(url)
					.then(
						function (data) {
							// var items = [];
							data.forEach(function (item) {
								item.id = item._id;
								// 	var tmp = Ember.Object.create(item);
								// 	items.push(tmp);
							});

							obj.set('places', data);
							deferred.resolve(obj.get('places'));//{data: data, more: false});
						}
						, deferred.reject);
			}
		},
		clearPlace: function () {
			this.set('filterPlace', null);
		},
		notifyMe: function () {
			this.set('notifyMeVisible', true);
		},
		notifyMeSubmit: function () {
			var obj = this;
			var currentFilter = {
				email: this.get('userEmail'),
				type: this.get('filterType'),
				lat: this.get('location.lat'),
				lng: this.get('location.lng'),
				place: this.get('filterPlace.NAME1')
			};
			
			// Todo: submit registration to API
			$.post(obj.get('statnoticeURL') + "/api/notifications", currentFilter, function (result) {
				// $.post("http://statnotices.azurewebsites.net/api/notifications", currentFilter, function(result){
				// console.log('Notification response' + result);
				if (result.saved) {
					obj.set('notifyMeVisible', false);
				} else {
					alert('Sorry there was a problem saving your notification, please try again or contact simon@hebeworks.com if the problem persists.');
				}
			});

			// console.log(currentFilter);
		}
	}
});
