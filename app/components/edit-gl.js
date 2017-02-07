import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service('store'),
  showValidation: {},
  cvTypes: [
     { type: 'CV',    maxAddress: 255, maxValue:255, bitEnabled: false },
     { type: 'CVBIT', maxAddress: 255, maxValue:  1, bitEnabled: true },
     { type: 'REG',   maxAddress:   8, maxValue:255, bitEnabled: false  },
     { type: 'PAGE',  maxAddress: 255, maxValue:255, bitEnabled: false }
  ],
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('name', this.get('gl').get('name'));
    this.set('cv', this.get('store').createRecord('cv', this.cvTypes[0]));
  },
  actions: {
    apply() {
      this.get('onModify')(this.get('name'));
    },
    setCVType(cvType) {
      let cv = this.get('cv');
      cv.set('type', cvType.type);
      cv.set('maxAddress', cvType.maxAddress);
      cv.set('maxValue', cvType.maxValue);
      cv.set('bitEnabled', cvType.bitEnabled);
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
