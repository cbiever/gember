import Ember from 'ember';

export default Ember.Route.extend({
  model() {
//    Ember.$.ajax({
//      data: '{ "data": { "id": "?", "type": "session", "attributes": { "session-id": 0, "mode": "command" } } }',
//      method: 'POST',
//      url: '/api/v1/sessions',
//      error: function() {
//        console.log('Error creating session');
//      }
//    }).then((data) => {
//      this.store.pushPayload('session', data);
//    });
      var session = this.store.createRecord('session');
      session.set('mode', 'command');
      return session.save();
  }
});
