import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  bus: undefined,
  actions: {
    addGL(address, protocol, speedSteps, numberOfFunctions) {
      let gl = this.get('store').createRecord('gl', {
        id: this.get('bus').get('id') + '-' + address,
        address: address,
        bus: this.get('bus'),
        protocol: protocol,
        protocolVersion: 1,
        decoderSpeedSteps: speedSteps,
        numberOfDecoderFunctions: numberOfFunctions,
        drivemode: 1,
        v: 0,
        vMax: speedSteps,
        functions: []
      });
      gl.save();
    }
  },
  tagName: ''
});
