import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions: {
    edit() {

    },
    remove() {
      let gl = this.get('gl');
      let bus = this.get('store').peekRecord('bus', gl.get('bus').get('id'));
      let address = gl.get('address');
      let busId = bus.get('id');
      gl.destroyRecord().then(
        function() {
          console.log('gl ' + address + ' of bus ' + busId + ' deleted');
          if (bus.get('gls.length') == 0) {
            console.log('deleting bus ' + busId);
            bus.destroyRecord().then(function() {
              console.log('bus ' + busId + ' destroyed');
            });
          }
        },
        function(error) {
          console.log('error deleting gl ' + address + '(' + error + ')');
        }
      )
    },
    setSpeed(vDelta) {
      let gl = this.get('gl');
      gl.set('drivemode', vDelta > 0 ? 1 : 0);
      let v = gl.get('v');
      v += vDelta;
      if (v < 0) {
        v = 0;
      }
      else if (v > gl.get('vMax')) {
        v = gl.get('vMax');
      }
      gl.set('v', v);
      gl.save();
    },
    setFunction(index) {
      let gl = this.get('gl');
      let functions = gl.get('functions');
      functions[index] = functions[index] == 0 ? 1 : 0;
      gl.save();
    },
    stop() {
      let gl = this.get('gl');
      gl.set('drivemode', 2);
      gl.save();
    }
  }
});
