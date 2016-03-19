'use strict';

import mongoose from 'mongoose';

var MyOfferSchema = new mongoose.Schema({
  refNo: String,
  descr: String,
  employer: {
    name: String,
    email: String,
    website: String
  }
});

export default mongoose.model('MyOffer', MyOfferSchema);
