'use strict';

import mongoose from 'mongoose';

var MyOfferSchema = new mongoose.Schema({
  origin: String,
  shares: [
    String
  ],
  refNo: String,
  faculty: String,
  specialisation: String,
  languages: [{
    language: String,
    level: String
  }],
  otherReq: String,
  descr: String,
  minWeeks: Number,
  maxWeeks: Number,
  minDate: String,
  maxDate: String,
  pay: Number,
  payPer: String,
  lodgingBy: String,
  employer: {
    name: String,
    email: String,
    website: String,
    address: String
  }
});

export default mongoose.model('MyOffer', MyOfferSchema);
