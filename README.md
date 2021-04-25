added an auto-number index as key to the table (I dont like to rely on un controlled data).
I used a mysql database bu it can work with any db. 
connection string has to be changed on two places (app.module.ts, cars.e2e-spec.ts) as I am using the same db for test and app.

run app with npm start 
run test with npm run test:e2e

I am usign typeOrm for querying the db. the code is in cars.service.ts.
cars.controller.ts manages the rest API specifics like extracting and validating the params or creating the CSV file.

a test is in cars.e2e-spec.ts file.
it is an e2e test and is using the db.

