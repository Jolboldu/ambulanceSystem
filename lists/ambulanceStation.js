const {Text, Integer} = require('@keystonejs/fields');

module.exports = {
  fields: {
    adress: {
      type: Text,
      isRequired: true,
    },
    phoneNumber: {
      type: Integer,
      isRequired: true,
    }
  },
  labelResolver: item => item.adress,
};
