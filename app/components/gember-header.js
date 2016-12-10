import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  session: undefined,
  actions: {
    downloadConfiguration() {
      this.get('ajax').request('/api/v1/rs/configuration', {
        method: 'GET',
        dataType: "text"
      }).then(function(configuration) {
        window.saveAs(new Blob([configuration], {type: 'text/plain'}), 'gember.yaml');
      }).catch(function(error) {
        alert(error);
      });
    }
  }
});
