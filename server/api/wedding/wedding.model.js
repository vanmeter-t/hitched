'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    GuestSchema = mongoose.model('Guest');

/**
* Wedding Schema
*/
var WeddingSchema = new Schema({
  firstName: String,
  firstType: String, 
  secondName: String,
  secondType: String,
  dateTime: Date,
  unlockCode: String,
  location: String,
  guestList: [ GuestSchema ]
});

/**
 * Virtuals
 */

// Public wedding information
WeddingSchema
  .virtual('info')
  .get(function() {

    return {
      'firstName': this.firstName,
      'firstType': this.firstType,
      'secondName': this.secondName,
      'secondType': this.secondType,
      'dateTime': this.dateTime,
      'unlockCode': this.unlockCode,
      'location': this.location,
      'guestList': this.guestList
    };
  });


module.exports = mongoose.model('Wedding', WeddingSchema);
