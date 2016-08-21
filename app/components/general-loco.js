import Ember from 'ember';

export default Ember.Component.extend({
  forward: true,
  actions: {
    edit() {

    },
    remove() {
      let gl = this.get('gl');
      let address = gl.get('address');
      gl.destroyRecord().then(
        function() {
          console.log('gl ' + address + ' deleted');
        },
        function(error) {
          console.log('error deleting gl ' + address + '(' + error + ')');
        }
      )
    },
    plus() {
      let gl = this.get('gl');
      gl.set('v', gl.get('v') + 1);
      gl.save();
    },
    minus() {
      let gl = this.get('gl');
      gl.set('v', gl.get('v') - 1);
      gl.save();
    },
    setFunction(index) {
      let gl = this.get('gl');
      let functions = gl.get('functions');
      functions[index] = functions[index] == 0 ? 1 : 0;
      gl.save();
    },
    changeDrivemode() {
      let gl = this.get('gl');
      gl.drivemode = gl.drivemode == 0 ? gl.drivemode = 1 : gl.drivemode = 0;
      gl.save();
      this.set('forward', gl.drivemode == 1);
    },
    stop() {
      let gl = this.get('gl');
      gl.drivemode = 2;
      gl.save();
    }
  }
});
