'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
    name: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String
});

module.exports = mongoose.model('Location', LocationSchema);