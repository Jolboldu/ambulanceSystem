const {Relationship} = require('@keystonejs/fields');

module.exports = {
  fields: {
    staff: {
      type: Relationship,
      ref: 'MedicalStaff',
      many: true
    },
  },
  // labelResolver: item => item.staff,
};
