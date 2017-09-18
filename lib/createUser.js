var cloudmine = require('cloudmine');
var q = require('q');
var _ = require('lodash');

var factory = require('./factory');
var validic = require('./validic');

var createUser = function(profile, ws) {
  // create the user
  // login as the user
  //  store the session token in the return object
  // provision a validic user
  //  store the validic access token in the return object
  //  create a user-level profile object, and store the validic access token and user_id on it

  var deferred = q.defer();

  ws.createUser(profile).on('success', function(data){
    deferred.resolve(data);
  }).on('error', function(error){
    deferred.reject(error);
  });

  return deferred.promise;
}

var snippet = function(req, res) {
  var ws = factory.generateWSFromRequest(req);

  var body = req.payload.request.body;
  var profile = body['profile'];

  createUser(profile, ws)
  .then(function(value){
    var externalId = value['__id__'];

    validic.createValidicUser(externalId)
    .then(function(validicResponse){
      res(_.extend(value, validicResponse));
    })
    .catch(function(error){
      res('there was an error creating your validic account');
    });
  }, function(reason){
    res({
      'text': 'error creating CMUser',
      'reason': reason
    });
  });
}

module.exports = {
  "snippet": snippet,
  "createUser": createUser
}
