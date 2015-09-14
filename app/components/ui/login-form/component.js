import Ember from 'ember';

export default Ember.Component.extend({
	// Properties	
	loginTypeSelected : false,
	newUserSelected: false,
	existingUserSelected: false,
	
	username: '',
	message: '',
	appController: null,
	hideLoginForm: false,
	
	// Methods
	submit: function () {
		if (this.get('existingUserSelected') == true) {
			this.login();
		} else {
			this.checkUserExists();
			// this.register();
		}
	},

	login: function () {
		var obj = this;
		var appController = this.get('appController');
		var username = this.get('username');
		appController.authLogin(username).then(
			function (user) {
				if (!Ember.isEmpty(user)) {
					obj.loggedIn();
				}
			},
			function (err) {
				obj.set('message', err.message);
			}
		);
	},

	loggedIn: function () {
		var obj = this;
		this.setProperties({
			'hideLoginForm': true,
			message: null
		});
		
		setTimeout(function () {
			obj.set('visible', false);
		}, 1000);
	},

	checkUserExists: function() {
		var obj = this;
		var username = this.get('username');
		return this.store.find('user',username)
			.then(
				function(user){
					if(Ember.isEmpty(user)) {
						obj.register();
					} else {
						obj.set('message','Sorry this name is taken. Please try another');
					}
				},
				function(err){
					obj.register();
				}
			)	
	},

	register: function () {
		var obj = this;
		var appController = this.get('appController');
		var username = this.get('username');
		
		var success = function (user) {
			// user created 
			// alert('user saved: ' + user);
			login(user);
		};

		var failed = function (err) {
			// user failed
			obj.set('message',err.message);
			// alert(err);
		};

		var login = function (savedUser) {
			appController.authLogin(username).then(
				function (user) {
					if (!Ember.isEmpty(user)) {
						obj.loggedIn();
					}
				},
				function (err) {
					obj.set('message', err.message);
				}
			);
		}
		
		// create a new user
		var user = this.store.createRecord('user', { username: username });
		// save user
		user.save().then(success, failed);
	},
	
	// Actions
	actions: {
		selectLoginType: function (type) {
			switch(type) {
				case 'newUser' :
					this.set('newUserSelected', true);
					this.set('existingUserSelected', false);
				break;
				case 'existingUser' :
					this.set('newUserSelected', false);
					this.set('existingUserSelected', true);
				break;
			}
			this.set('loginTypeSelected', true);
		},
		submit: function () {
			this.submit();
		}
	}
});
