/**
 * MyOffer model events
 */

'use strict';

import {EventEmitter} from 'events';
var MyOffer = require('./myOffer.model');
var MyOfferEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MyOfferEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MyOffer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MyOfferEvents.emit(event + ':' + doc._id, doc);
    MyOfferEvents.emit(event, doc);
  }
}

export default MyOfferEvents;
