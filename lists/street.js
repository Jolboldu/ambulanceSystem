const {Text} = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    }
  },
  labelResolver: item => item.name,
};
