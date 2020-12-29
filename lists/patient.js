const {Text, Integer} = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    phoneNumber: {
      type: Integer,
      isRequired: true,
    },
    age: {
      type: Integer,
      isRequired: true
    }
  },
};
