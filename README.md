# Delanta test

## Project setup

### Node.js Server
```
cd node-express-server
npm install
node server.js
```
API will be available in `http://localhost:8080/`.

### Angular Client
```
cd angular-14-client
npm install
npm install -g @angular/cli
```
Run `ng serve --port 8081` for a dev server. 
Navigate to `http://localhost:8081/`.

### Please Note
*Emails will not be work unless add the AWS Key and Secret in the user.controller.js
*MongoDB is already in the cloud cluster

### Few of the things can be improve in this are

1. Use the environment config file for API Urls etc
2. Use the separate secret environment for database login passwords and AWS secrets etc.
