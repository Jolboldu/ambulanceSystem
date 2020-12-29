const {Text, Relationship, DateTimeUtc} = require('@keystonejs/fields');

module.exports = {
  fields: {
    DateTimeOfCall: {
      type: DateTimeUtc	,
      isRequired: true,
      format: 'dd/MM/yyyy HH:mm',
    },
    description: {
      type: Text,
      isRequired: true,
    },
    patient: {
      type: Relationship,
      ref: 'Patient',
      isRequired: true
    },
    adressOfCall: {
      type: Relationship,
      ref: 'AdressOfCall',
      isRequired: true
    },
  },
};
