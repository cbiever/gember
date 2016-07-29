import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    plus() {
      var gl = this.get('gl');
      gl.set('v', gl.get('v') + 1);
      gl.save();
    },
    minus() {
      var gl = this.get('gl');
      gl.set('v', gl.get('v') - 1);
      gl.save();
    }
  }
});
