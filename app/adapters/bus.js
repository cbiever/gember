import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id, snapshot, requestType, query) {
    let bus = this.store.peekRecord(modelName, id);
    let session = bus.get('session').get('id');
    return '/api/v1/rs/sessions/' + session + '/buses/' + snapshot.id;
  }
});
