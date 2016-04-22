/* globals moment addthisevent _ $ */

import Ember from 'ember';
import DefaultStory from './../../story-types/default-story/component';
import EditableFields from 'hebe-dash/mixins/editable-fields';

export default DefaultStory.extend(EditableFields, {
  initialConfig: {
    title: 'Find My Bin Day',
    subTitle: 'Find your next Leeds bin day',
  },

  addresses: [],
  currentAddress: null,
  selectedAddress: null,
  showCalendarButton: false,
  storyModel: null,
  minCheckTimer: null,

  editableFields: [
    {
      name: 'current_address',
      type: 'text',
      value: '',
      placeholder: 'Current address',
    },
  ],

  onAttrs: function onAttrs() {
    // load in the initial saved address
    const editedVal = this.fetchEditableFieldValue('current_address');
    if (editedVal) {
      const fromJSON = JSON.parse(editedVal);
      this.set('selectedAddress', fromJSON);
      this.onAddressChange();
    }
  }.on('didReceiveAttrs'),

  // currentAddress: Ember.computed('storyModel.config.@each.value', '_currentAddress', {
  //   get() {
  //     const editedVal = this.fetchEditableFieldValue('current_address');
  //     const _currentAddress = this.get('_currentAddress');
  //     if (editedVal !== _currentAddress) {
  //       if (editedVal) {
  //         const fromJSON = JSON.parse(editedVal);
  //         this.set('_currentAddress', fromJSON);
  //         return fromJSON;
  //       }
  //     }
  //     return editedVal || null;
  //   },
  //   set(key, value) {
  //     if (this.get('_currentAddress') !== value) {
  //       const jsonVal = JSON.stringify(value);
  //       const field = this.get('storyModel.config').find((item) => item.get('name') === 'current_address');
  //       // const field = this.get('editableFields').find((item) => item.get('name') === 'current_address');
  //       if (field) {
  //         field.set('value', jsonVal);
  //         // field.value = value;
  //       }
  //       this.set('_currentAddress', value);
  //       this.set('action', 'saveCanvasState');
  //       this.sendAction('action');
  //     }
  //     return value;
  //   },
  // }),

  didReceiveAttrs: function didReceiveAttrs() {
    const _this = this;
    // this.set('title', 'find-my-bin-day TITLE');
    // this.set('subTitle', 'find-my-bin-day SUB TITLE');
    this.minCheckTimer = setInterval(_this.minimumLengthCheck, 200);
  },

  saveThisEvent() {
    const _this = this;

    $.getScript('https://addthisevent.com/libs/1.6.0/ate.min.js', () => {
      addthisevent.settings({
        mouse: false,
        css: false,
        outlook: { show: true, text: 'Outlook Calendar' },
        google: { show: true, text: 'Google Calendar' },
        yahoo: { show: true, text: 'Yahoo Calendar' },
        ical: { show: true, text: 'iCal Calendar' },
        hotmail: { show: true, text: 'Hotmail Calendar' },
        facebook: { show: true, text: 'Facebook Calendar' },
      });

      _this.set('showCalendarButton', true);
    });
  },

  minimumLengthCheck() {
    const noResults = this.$('.select2-no-results');
    if (noResults.length > 0) {
      if (noResults.text().startsWith('Please enter')) {
        noResults.text('Please enter the first part of your address');
      }
    }
  },

  onAddressChange: function onAddressChange() {
    const _this = this;
    const id = this.get('selectedAddress.id') || this.get('selectedAddress._id');
    const selectedAddress = this.get('selectedAddress');

    const selectedJSON = JSON.stringify(selectedAddress);
    const savedAddress = this.fetchEditableFieldValue('current_address');
    if (selectedAddress && savedAddress && selectedJSON !== savedAddress) {
      this.saveEditableFieldValue('current_address', selectedJSON);
    }

    if (!Ember.isEmpty(selectedAddress)) {
      const hebeNodeAPI = this.get('appSettings.hebeNodeAPI');
      this.getData(`${hebeNodeAPI}/bins/${id}`)
        .then((loadedAddress) => {
          const allDates = [];
          const address = loadedAddress;
          address.streetAddress = (address.address.indexOf(',') > -1 ?
              address.address.toString().substr(0, address.address.toString().indexOf(','))
              : address.address);

          address.shortAddress = address.streetAddress + (!Ember.isEmpty(address.postcode) ? `, ${address.postcode}` : '');

          address.routes.forEach((route) => {
            route.dates.forEach((date) => {
              const formattedDate = moment.duration(moment(new Date()).diff(moment(new Date(date)))).humanize();
              function getDescription(code) {
                const checkCode = code.toLowerCase();
                switch (checkCode) {
                  default:
                    return { short: 'General', long: 'General rubbish', icon: 'bin-icon' };
                  case 'green':
                    return { short: 'Recycling', long: 'Paper, cardboard, cans, aluminium aerosols, foil, plastics', icon: 'recycle-icon' };
                  case 'brown':
                    return { short: 'Garden', long: 'Grass cuttings, hedge clippings, leaves, plants, twigs, small tree branches', icon: 'brown-icon' };
                }
              }

              allDates.push({
                date,
                formattedDate,
                type: route.type,
                description: getDescription(route.type),
                code: route.code,
              });
            });
          });

          const futureDates = _.filter(allDates, (date) => new Date(date.date) >= new Date());

          let orderedDates = _.sortBy(futureDates, (el) => el.date);

          orderedDates = orderedDates.slice(0, 8);
          _this.set('orderedDates', orderedDates);
          _this.saveThisEvent();
          _this.set('currentAddress', address);
        });
    }
  }.observes('selectedAddress'),

  actions: {
    findPlaces(query, deferred) {
      this.setProperties({
        query,
        deferred,
      });
      Ember.run.debounce(this, this.debouncedQuery, 600);
    },
    changeAddress() {
      this.set('currentAddress', null);
      this.set('selectedAddress', null);
    },
  },

  debouncedQuery() {
    const _this = this;
    const query = _this.get('query');
    const deferred = _this.get('deferred');

    if (query && query.term && query.term.length >= 3) {
      const hebeNodeAPI = _this.get('appSettings.hebeNodeAPI');
      const url = `${hebeNodeAPI}/bins/?q=${query.term}&fields=address postcode`;
      this.getData(url)
        .then((data) => {
          data.forEach((item) => {
            item.id = item._id;
            item.streetAddress = (item.address.indexOf(',') > -1 ?
                item.address.toString().substr(0, item.address.toString().indexOf(','))
                : item.address);
            item.shortAddress = item.streetAddress + (!Ember.isEmpty(item.postcode) ? `, ${item.postcode}` : '');
          });

          _this.set('addresses', data);
          deferred.resolve(_this.get('addresses'));
        }
        , deferred.reject);
    }
  },
});
