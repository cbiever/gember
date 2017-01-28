import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  gl: undefined,
  name: undefined,
  cvType: 'CV',
  cvAddress: undefined,
  cvValue: undefined,
  cvBit: undefined,
  cvBitDisabled: true,
  cvMaxAddress: 255,
  cvMaxValue: 255,
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('name', this.get('gl').get('name'));
  },
  actions: {
    apply() {
      this.get('onModify')(this.get('name'));
    },
    setCVType(cvType) {
      this.set('cvType', cvType);
      switch (cvType) {
        case 'CV':
          this.set('cvMaxAddress', 255);
          this.set('cvMaxValue', 255);
          this.set('cvBitDisabled', true);
          break;
        case 'CVBIT':
          this.set('cvMaxAddress', 255);
          this.set('cvMaxValue', 1);
          this.set('cvBitDisabled', false);
          break;
        case 'REG':
          this.set('cvMaxAddress', 8);
          this.set('cvMaxValue', 255);
          this.set('cvBitDisabled', true);
          break;
        case 'CV':
          this.set('cvMaxAddress', 255);
          this.set('cvMaxValue', 255);
          this.set('cvBitDisabled', true);
          break;
      }
    },
    setCV() {
      let request = {};
      request.type = this.get('cvType');
      request.values = [ ];
      if (this.get('cvType') == 'CVBIT') {
        request.values.push(parseInt(this.get('cvBit')));
      }
      request.values.push(parseInt(this.get('cvValue')));
      let gl = this.get('gl');
      let bus = gl.get('bus');
      let session = bus.get('session');
      let url = '/rs/sessions/' + session.get('id') + '/buses/' + bus.get('id') + '/gls/' + gl.get('address') + '/cvs/' + this.get('cvAddress');
      this.get('ajax').put(url, { data: JSON.stringify(request) }).catch(function(error) { console.log('' + error); });
    }
  },
  tagName: ''
});
