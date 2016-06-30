import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [ {address:1}, {address:4}, {address:9}];
  }
});
