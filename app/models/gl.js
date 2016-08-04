import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    bus: belongsTo('bus'),
    address: attr(),
    protocol: attr(),
    protocolVersion: attr(),
    decoderSpeedSteps: attr(),
    numberOfDecoderFunctions: attr(),
    drivemode: attr(),
    v: attr(),
    vMax: attr(),
    functions: attr()
});
