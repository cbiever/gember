import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id, snapshot, requestType, query) {
    let gl = this.store.peekRecord(modelName, id ? id : snapshot.id);
    let bus = gl.get('bus').get('id');
    let session = gl.get('bus').get('session').get('id');
    if ('createRecord' == requestType) {
      return '/api/v1/rs/sessions/' + session + '/buses/' + bus + '/gls';
    }
    else {
      return '/api/v1/rs/sessions/' + session + '/buses/' + bus + '/gls/' + gl.get('address');
    }
  }
});
