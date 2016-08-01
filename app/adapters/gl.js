import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id, snapshot, requestType, query) {
    let gl = this.store.peekRecord(modelName, id);
    gl = JSON.parse(JSON.stringify(gl));
    let bus = this.store.peekRecord('bus', gl.bus);
    bus = JSON.parse(JSON.stringify(bus));
    let session = this.store.peekRecord('session', bus.session);
    session = JSON.parse(JSON.stringify(session));
    return '/api/v1/rs/sessions/' + bus.session + '/buses/' + gl.bus + '/gls/' + snapshot.id;
  }
});
