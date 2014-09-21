'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    GuestSchema = mongoose.model('Guest');

/**
* Wedding Schema
*/
var WeddingSchema = new Schema({
  first: {
       name: String,
       type: String
  },
  second: {
       name: String,
       type: String
  },
  dateTime: Date,
  unlockCode: String,
  location: { type: Schema.ObjectId, ref: 'Location' },
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
      'first': this.first,
      'second': this.second,
      'dateTime': this.dateTime,
      'unlockCode': this.unlockCode,
      'location': this.location,
      'guestList': this.guestList
    };
  });


module.exports = mongoose.model('Wedding', WeddingSchema);
