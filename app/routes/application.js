import Ember from 'ember';

export default Ember.Route.extend({
  websockets: Ember.inject.service(),
  session: undefined,
  model() {
      let self = this;
      let session = this.store.createRecord('session');
      session.set('mode', 'command');
      return session.save().then(function(session) {
        self.session = session;
        let socket = self.get('websockets').socketFor('ws://' + location.host + '/api/v1/ws/info');
        socket.on('message', self.infoMessage, self);
        return session;
      });
  },
  infoMessage: function(data) {
    let message = JSON.parse(data.data);
    if (message.data.type == 'gl') {
      let gl = message.data.attributes;
      let existingGL = this.store.peekRecord('gl', message.data.id);
      if (existingGL == null || !existingGL.get('isDeleted')) {
        if (message.action == 'create' || message.action == 'update') {
          let bus = this.store.peekRecord('bus', gl.bus);
          if (!bus) {
            this.store.pushPayload(this.createBus(gl));
            bus = this.store.peekRecord('bus', gl.bus);
            bus.set('session', this.session);
          }
          this.store.pushPayload(message);
          gl = this.store.peekRecord('gl', message.data.id);
          gl.set('bus', bus);
        }
        else {
          this.store.findRecord('gl', message.data.id, { reload: false }).then(function(gl) {
            this.store.unloadRecord(gl);
          });
        }
      }
      else {
        console.log('gl ' + gl.address + ' of bus ' + gl.bus + ' is deleted');
      }
    }
  },
  createBus: function(gl) {
    let bus = '{ "data": { "id": ' + gl.bus + ', "type": "bus", "attributes": { } } }';
    return JSON.parse(bus);
  }
});
