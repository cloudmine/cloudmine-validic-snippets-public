var cloudmine = require('cloudmine');

var constants = require('./constants');
var createUser = require('./createUser');
var factory = require('./factory');

var login = function(profile, ws){
  // Get the credentials from the request

  // Does the user exist? Try to login to see if they do

  // If the user doesn't exist, create a new one
  // This process should be a separate snippet, createUser, that creates a CM
  //  user, and also provisions a Validic User
  // The Validic user information should be stored within a user-level profile object
  // The createUser snippet should return a CM Session Token and Validic Auth Token
  // These values can then be returned directly

  // If the user exists, login
  // store the session token to the return object

  // Check the user level profile object for a validic access token
  // if the access token exists and is less than a day old, use it
  // otherwise, get a new access token

  var retObject = {};

  // try to login with the input profile and webService
  ws.login(profile).on('success', function(data){
    // the login was successful
    sess = data['session_token'];
    retObject['session_token'] = sess;
  })

}

var snippet = function(req, res) {
  var body = req.payload.request.body;
  var profile = body['profile'];

  var ws = factory.generateWSFromRequest(req);
}

module.exports = {
  "snippet": function(req, res) {
    console.log('explode!');
    res("explode!");
  }
}
