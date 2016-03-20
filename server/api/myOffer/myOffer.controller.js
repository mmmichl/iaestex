/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/myOffers              ->  index
 * POST    /api/myOffers              ->  create
 * GET     /api/myOffers/:id          ->  show
 * PUT     /api/myOffers/:id          ->  update
 * DELETE  /api/myOffers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import MyOffer from './myOffer.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of MyOffers
export function index(req, res) {
  return MyOffer.find({origin: req.user.institution}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of shared offers
export function shared(req, res) {
  return MyOffer.find({shares: req.user.institution}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MyOffer from the DB
export function show(req, res) {
  return MyOffer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MyOffer in the DB
export function create(req, res) {
  return MyOffer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing MyOffer in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MyOffer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MyOffer from the DB
export function destroy(req, res) {
  return MyOffer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
