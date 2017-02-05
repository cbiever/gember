import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service('store'),
  showValidation: {},
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('name', this.get('gl').get('name'));
    this.set('cv', this.get('store').createRecord('cv', { type: 'CV' }));
  },
  actions: {
    apply() {
      this.get('onModify')(this.get('name'));
    },
    setCVType(type) {
      let cv = this.get('cv');
      cv.set('type', type);
      switch (type) {
        case 'CV':
        case 'PAGE':
          cv.set('maxAddress', 255);
          cv.set('maxValue', 255);
          cv.set('bitEnabled', false);
          break;
        case 'CVBIT':
          cv.set('maxAddress', 255);
          cv.set('maxValue', 1);
          cv.set('bitEnabled', true);
          break;
        case 'REG':
          cv.set('maxAddress', 8);
          cv.set('maxValue', 255);
          cv.set('bitEnabled', false);
          break;
      }
    },
    setCV() {
      let cv = this.get('cv');
      let request = this.createRequest(cv);
      let url = this.createURL(cv);
      this.get('ajax').put(url, { data: JSON.stringify(request) }).catch(function(error) { console.log('' + error); });
    },
    showValidation(name) {
      this.set('show' + name.capitalize() + 'Validation', true);
    }
  },
  createRequest(cv) {
    let request = {};
    request.type = cv.get('type');
    request.values = [ ];
    if (cv.get('type') == 'CVBIT') {
      request.values.push(parseInt(cv.get('bit')));
    }
    request.values.push(parseInt(cv.get('value')));
    return request;
  },
  createURL(cv) {
    let gl = this.get('gl');
    let bus = gl.get('bus');
    let session = bus.get('session');
    return '/rs/sessions/' + session.get('id') + '/buses/' + bus.get('id') + '/gls/' + gl.get('address') + '/cvs/' + cv.get('address');
  },
  tagName: ''
});
