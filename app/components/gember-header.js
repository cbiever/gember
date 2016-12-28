import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  session: undefined,
  actions: {
    downloadConfiguration() {
      let sessionId = this.get('session').get('sessionId');
      this.get('ajax').request('/api/v1/rs/sessions/' + sessionId + '/configuration', {
        method: 'GET',
        dataType: "text"
      }).then(function(configuration) {
        window.saveAs(new Blob([configuration], {type: 'text/plain'}), 'gember.yaml');
      }).catch(function(error) {
        alert(error);
      });
    },
    uploadConfiguration() {
      let ajax = this.get('ajax');
      let sessionId = this.get('session').get('sessionId');
      $('#configurationUpload').change(function() {
        let files = $('#configurationUpload').prop('files');
        let fileReader = new FileReader();
        fileReader.onload = function(configuration) {
          ajax.request('/api/v1/rs/sessions/' + sessionId + '/configuration', {
            method: 'POST',
            data: configuration.target.result,
            dataType: "text"
          }).catch(function(error) {
            alert(error);
          });
        };
        fileReader.readAsText(files[0]);
      });
      $('#configurationUpload').click();
    }
  },
  tagName: ''
});
