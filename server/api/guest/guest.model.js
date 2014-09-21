'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
* Guest Schema
*/
var GuestSchema = new Schema({
  guestName: String, 
  guestCount: Number
});

module.exports = mongoose.model('Guest', GuestSchema);