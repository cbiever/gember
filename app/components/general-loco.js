import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  forward: undefined,
  willUpdate() {
    let gl = this.get('gl');
    if (gl.get('drivemode') == 0) {
      this.set('forward', false);
    }
    else if (gl.get('drivemode') == 1) {
      this.set('forward', true);
    }
  },
  actions: {
    edit() {

    },
    setSpeed(vDelta) {
      let gl = this.get('gl');
      let v = gl.get('v');
      if (gl.get('drivemode') == 2) {
        if (this.get('forward')) {
          gl.set('drivemode', 1);
        }
        else {
          gl.set('drivemode', 0);
        }
      }
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
    setForward() {
      let gl = this.get('gl');
      gl.set('drivemode', 1);
      gl.save();
      this.set('forward', true);
    },
    setBackward() {
      let gl = this.get('gl');
      gl.set('drivemode', 0);
      gl.save();
      this.set('forward', false);
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
  }
});
