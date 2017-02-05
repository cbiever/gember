import DS from 'ember-data';
import attr from 'ember-data/attr';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  address: validator('number', {
    allowString: true,
    integer: true,
    gte: 1,
    lte: Ember.computed.readOnly('model.maxAddress'),
    description: 'Address'
  }),
  value: validator('number', {
    allowString: true,
    integer: true,
    gte: 0,
    lte: Ember.computed.readOnly('model.maxValue'),
    description: 'Value'
  }),
  bit: validator('number', {
    disabled: Ember.computed.not('model.bitEnabled'),
    allowString: true,
    integer: true,
    gte: 0,
    lte: 7,
    description: 'Bit'
  })
});

export default DS.Model.extend(Validations, {
  type: attr('string'),
  address: attr('number'),
  maxAddress: attr('number'),
  value: attr('number'),
  minValue: attr('number'),
  bit: attr('number'),
  bitEnabled: attr('boolean')
});
