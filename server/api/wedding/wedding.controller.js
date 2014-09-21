/**
 * GET     /wedding              ->  index
 * POST    /wedding              ->  create
 * GET     /wedding/:id          ->  show
 * PUT     /wedding/:id          ->  update
 * DELETE  /wedding/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Wedding = require('./wedding.model');

// Get list of weddings
exports.index = function(req, res) {
  Wedding.find(function (err, weddings) {
    if(err) { return handleError(res, err); }
    return res.json(200, weddings);
  });
};

// Get a single wedding
exports.show = function(req, res) {
  Wedding.findById(req.params.id, function(err, wedding) {
    if(err) { return handleError(res, err); }
    if(!wedding) { return res.send(404); }
    return res.json(wedding);
  });
};

// Creates a new wedding in the DB.
exports.create = function(req, res) {
  Wedding.create(req.body, function(err, wedding) {
    if(err) { return handleError(res, err); }
    return res.json(201, wedding);
  });
};


// Update an existing wedding
exports.update = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  Wedding.findById(req.params.id, function (err, wedding) {
    if (err) { return handleError(res, err); }
    if(!wedding) { return res.send(404); }
    var updated = _.merge(wedding, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wedding);
    });
  });

  // var wedding = req.body;
  // var update = {
  //   $set: {
  //     firstName: wedding.firstName,
  //     firstType: wedding.firstType,
  //     secondName: wedding.secondName,
  //     secondType: wedding.secondType,
  //     dateTime: wedding.dateTime,
  //     unlockCode: wedding.unlockCode
  //   }
  // };

  // console.log('Saving wedding: ' + wedding);
  // console.log('Update: ' + update);
  // Wedding.findOneAndUpdate({
  //   _id: wedding._id
  // }, update, function(err, wedding) {
  //   if (err || !wedding) return res.json(400, err);
  //   console.log('Wedding Updated!' + wedding);
  //   res.send(200);
  // });
};

// Deletes a wedding from the DB.
exports.destroy = function(req, res) {
  Wedding.findById(req.params.id, function (err, wedding) {
    if(err) { return handleError(res, err); }
    if(!wedding) { return res.send(404); }
    wedding.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}