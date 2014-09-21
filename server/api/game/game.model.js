'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
  type: Number // can this be changed to an enum?
});


module.exports = mongoose.model('Game', GameSchema);