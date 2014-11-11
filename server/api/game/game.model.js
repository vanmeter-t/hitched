'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
  type: String, // can this be changed to an enum?
  gameInfo: Object
});

module.exports = mongoose.model('Game', GameSchema);