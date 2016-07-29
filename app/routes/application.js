import Ember from 'ember';

export default Ember.Route.extend({
  websockets: Ember.inject.service(),
  model() {
      var socket = this.get('websockets').socketFor('ws://' + location.host + '/api/v1/ws/info');
      socket.on('message', this.infoMessage, this);
      var session = this.store.createRecord('session');
      session.set('mode', 'command');
      return Ember.RSVP.hash({
        session: session.save(),
        gls: this.store.peekAll('gl')
      });
  },
  infoMessage: function(data) {
    var message = JSON.parse(data.data);
    if (message.action == 'create' || message.action == 'update') {
      this.store.pushPayload(message.data);
      console.log('gl ' + message.data.data.id + ' created or updated');
    }
    else if (message.action == 'delete') {
      this.store.findRecord('gl', message.data.id, { reload: false }).then(function(gl) {
        this.store.deleteRecord(gl);
        console.log('gl ' + gl.id + ' deleted');
      });
    } 
  }
});
