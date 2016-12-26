import Ember from 'ember';

export default Ember.Component.extend({
  gl: undefined,
  name: undefined,
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('name', this.get('gl').get('name'));
  },
  actions: {
    apply() {
      this.get('onModify')(this.get('name'));
    },
  }
});
