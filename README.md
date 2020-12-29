# KeystoneJS Starter Template

You've created a KeystoneJS project! This project contains a simple list of users and an admin application (`localhost:3000/admin`) with basic authentication.

## Dependencies 
1) Node.js 

2) Npm

3) Postgresql running server

## Running the Project.
a) `run npm install`

b)  create postgresql database, you can find credentials for my database `postgres://keystone:password@localhost/ambulance` where keystone is the user, password is the password and ambulance is database. Create database with my credentials or create with yours but after that update above credentials in `index.js`
Once running, the Keystone Admin UI is reachable via `localhost:3000/admin`.

c) run `npm run create-tables`

d) run `npm run dev`

e)  After that you have to login via admin panel and create new user, in order to do that:
  
  1) comment line 111
  2) comment line 74-80
  Once created user, uncomment these lines

d) Create all data via `cardOfCalls` in admin panel

e) enjoy
## Next steps

This example has no front-end application but you can build your own using the GraphQL API (`http://localhost:3000/admin/graphiql`).
