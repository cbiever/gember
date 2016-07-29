import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    bus: attr(),
    address: attr(),
    protocol: attr(),
    protocolVersion: attr(),
    decoderSpeedSteps: attr(),
    numberOfDecoderFunction: attr(),
    drivemode: attr(),
    v: attr(),
    vMax: attr()
});
