const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

//importing database schemas
const ambulanceStationSchema = require('./lists/ambulanceStation.js');
const citySchema = require('./lists/city.js');
const diagnosisSchema = require('./lists/diagnosis.js');
const patientSchema = require('./lists/patient.js');
const positionSchema = require('./lists/position.js');
const regionSchema = require('./lists/region.js');
const streetSchema = require('./lists/street.js');

const callAdressSchema = require('./lists/callAdress.js');
const medicalStaffSchema = require('./lists/medicalStaff.js');
const medicalTeamsSchema = require('./lists/medicalTeams.js');
const callLogsSchema = require('./lists/callLogs.js');
const callCardSchema = require('./lists/callCard.js');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const PROJECT_NAME = 'ambulance';
const adapterConfig = { knexOptions: { connection: 'postgres://keystone:password@localhost/ambulance'} };


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };


keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

//registering all lists
keystone.createList('Region', regionSchema);
keystone.createList('AmbulanceStation', ambulanceStationSchema);
keystone.createList('City', citySchema);
keystone.createList('Diagnosis', diagnosisSchema);
keystone.createList('Patient', patientSchema);
keystone.createList('Position', positionSchema);
keystone.createList('Street', streetSchema);

keystone.createList('AdressOfCall', callAdressSchema);
keystone.createList('MedicalStaff', medicalStaffSchema);
keystone.createList('MedicalTeam', medicalTeamsSchema);
keystone.createList('LogsOfCall', callLogsSchema);
keystone.createList('CardsOfCall', callCardSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: { protectIdentities: process.env.NODE_ENV === 'production' },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
