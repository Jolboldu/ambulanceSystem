const {Text, Relationship} = require('@keystonejs/fields');

module.exports = {
  fields: {
    fullName: {
      type: Text,
      isRequired: true
    },
    position: {
      type: Relationship,
      ref: 'Position',
      isRequired: true
    },
  },
  labelResolver: item => item.fullName
};
