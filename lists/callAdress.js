const {Text, Integer, Relationship} = require('@keystonejs/fields');

module.exports = {
  fields: {
    numberOfHouse: {
      type: Text,
    },
    numberOfAppartment: {
      type: Integer,
    },
    region: {
      type: Relationship,
      ref: 'Region',
      isRequired: true
    },
    city: {
      type: Relationship,
      ref: 'City',
      isRequired: true
    },
    street: {
      type: Relationship,
      ref: 'Street',
      isRequired: true
    }
  },
  labelResolver: item => 'id = ' + item.id + ' дом ' + item.numberOfHouse + ' кв' + item.numberOfAppartment
  
};
