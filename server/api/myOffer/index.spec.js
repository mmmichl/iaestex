'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var myOfferCtrlStub = {
  index: 'myOfferCtrl.index',
  show: 'myOfferCtrl.show',
  create: 'myOfferCtrl.create',
  update: 'myOfferCtrl.update',
  destroy: 'myOfferCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var myOfferIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './myOffer.controller': myOfferCtrlStub
});

describe('MyOffer API Router:', function() {

  it('should return an express router instance', function() {
    myOfferIndex.should.equal(routerStub);
  });

  describe('GET /api/myOffers', function() {

    it('should route to myOffer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'myOfferCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/myOffers/:id', function() {

    it('should route to myOffer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'myOfferCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/myOffers', function() {

    it('should route to myOffer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'myOfferCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/myOffers/:id', function() {

    it('should route to myOffer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'myOfferCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/myOffers/:id', function() {

    it('should route to myOffer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'myOfferCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/myOffers/:id', function() {

    it('should route to myOffer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'myOfferCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
