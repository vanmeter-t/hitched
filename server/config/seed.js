/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Game = require('../api/game/game.model');
var Guest = require('../api/guest/guest.model');
var Wedding = require('../api/wedding/wedding.model');
var User = require('../api/user/user.model');

// Wedding.find({}).remove(function() {
//   Wedding.create({
//     first: {
//          name: 'Test User',
//          type: 'Groom'
//     },
//     second: {
//          name: 'Test User Bride',
//          type: 'Bride'
//     },
//     dateTime: '2014-09-19T07:00:00.000Z',
//     unlockCode: 'UnlockCode'
//   }, function(err, wedding){
    
//       User.find({}).remove(function() {
//       User.create({
//           provider: 'local',
//           name: 'Test User',
//           email: 'test@test.com',
//           password: 'test',
//           wedding: wedding
//         }, {
//           provider: 'local',
//           role: 'admin',
//           name: 'Admin',
//           email: 'admin@admin.com',
//           password: 'admin'
//         }, function() {
//             console.log('finished populating users');
//           }
//         );
//       });
//   });
// });

