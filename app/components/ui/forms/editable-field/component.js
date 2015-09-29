import Ember from 'ember';

export default Ember.Component.extend({
	isTextArea: Ember.computed('field.type',{
		get(){
			return this.get('field.type') == 'textarea';
		}
	}),
	isDatePicker: Ember.computed('field.type',{
		get(){
			return this.get('field.type') == 'datepicker';
		}
	}),
	
});
