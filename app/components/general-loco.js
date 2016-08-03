import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
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
    set(index) {
      let gl = this.get('gl');
      let functions = gl.get('functions');
      functions[index] = functions[index] == 0 ? 1 : 0; 
      gl.save();
    }
  }
});
