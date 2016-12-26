import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    name: attr('string'),
    bus: belongsTo('bus'),
    address: attr('number'),
    protocol: attr('string'),
    protocolVersion: attr('number'),
    decoderSpeedSteps: attr('number'),
    numberOfDecoderFunctions: attr('number'),
    drivemode: attr('number'),
    v: attr('number'),
    vMax: attr('number'),
    functions: attr()
});
