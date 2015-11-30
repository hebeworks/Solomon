import Ember from 'ember';
import config from 'hebe-dash/config/environment';

export default Ember.Mixin.create({
	Config: config.APP,
	// dataMillCatAPI: '',
	// dataMillDataAPI: '',
	// hebeNodeAPI: '',
	
	// onComponentBasenInit: function () {
	// 	var dataMillCatAPI = this.get('Config').dataMillCatAPI.ensureNoEndingString('/');
	// 	var dataMillDataAPI = this.get('Config').dataMillDataAPI.ensureNoEndingString('/');
	// 	var hebeNodeAPI = this.get('Config').hebeNodeAPI.ensureNoEndingString('/');
	// 	this.setProperties({
	// 		dataMillCatAPI: dataMillCatAPI,
	// 		dataMillDataAPI: dataMillDataAPI,
	// 		hebeNodeAPI: hebeNodeAPI
	// 	});
	// }.on('init'),
	
	getData: function (url, cache) {
		var obj = this;
		return new Ember.RSVP.Promise(function (resolve, reject, complete) {
			try {
				var useCache = (cache != null && cache === true ? true : false);
				$.support.cors = true;
				$.ajax({
					url: url,
					cache: useCache,
					dataType: 'json',
					crossOrigin: true,
					type: 'GET',
					// async: false //false, // must be set to false ?????? NS
				})
					.done(resolve)
					.fail(reject)
					.always(complete);
				//Ember.$.ajax({
				//	url: url
				//})
				//.done(resolve)
				//.fail(reject)
				//.always(complete);
			}
			catch (err) {
				reject(err);
			}
			finally {
				if (complete != null) {
					complete();
				}
			}
		});
	}

});
