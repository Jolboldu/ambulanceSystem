const {Text, Relationship, DateTimeUtc} = require('@keystonejs/fields');

module.exports = {
  fields: 
  {
    DateTimeOfCard: {
      type: DateTimeUtc	,
      isRequired: true,
      format: 'dd/MM/yyyy HH:mm',
      isRequired: true
    },
    description: {
      type: Text,
    },
    anamnesis: {
      type: Text,
    },
    ambulanceStation: {
      type: Relationship,
      ref: 'AmbulanceStation',
      isRequired: true
    },
    medicalTeam: {
      type: Relationship,
      ref: 'MedicalTeam',
      isRequired: true
    },
    diagnosis: {
      type: Relationship,
      ref: 'Diagnosis',
      isRequired: true
    },
    callLog: {
      type: Relationship,
      ref: 'LogsOfCall',
      isRequired: true
    },
  },
};
