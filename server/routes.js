/**
 * Main application routes
 */

'use strict';

var path = require('path');
var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/game', require('./api/game'));
  app.use('/api/guest', require('./api/guest'));
  app.use('/api/location', require('./api/location'));
  app.use('/api/wedding', require('./api/wedding'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.route('/app/:url(guest|member)/*').get(function(req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.sendfile(app.get('appPath') + '/' + requestedView + '.html');
  });

  // All undefined assets or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });
};