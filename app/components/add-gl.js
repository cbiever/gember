import Ember from 'ember';

export default Ember.Component.extend({
  bus: undefined,
  address: 3,
  protocol: 'N',
  speedSteps: 28,
  numberOfFunctions: 4,
  actions: {
    add() {
      this.get('onAdd')(this.get('address'), this.get('protocol'), this.get('speedSteps'), this.get('numberOfFunctions'));
    },
    setProtocol(protocol) {
      this.set('protocol', protocol);
    },
    setSpeedSteps(speedSteps) {
      this.set('speedSteps', speedSteps);
    }
  }
});
