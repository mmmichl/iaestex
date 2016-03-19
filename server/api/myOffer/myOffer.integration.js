'use strict';

var app = require('../..');
import request from 'supertest';

var newMyOffer;

describe('MyOffer API:', function() {

  describe('GET /api/myOffers', function() {
    var myOffers;

    beforeEach(function(done) {
      request(app)
        .get('/api/myOffers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          myOffers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      myOffers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/myOffers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/myOffers')
        .send({
          name: 'New MyOffer',
          info: 'This is the brand new myOffer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMyOffer = res.body;
          done();
        });
    });

    it('should respond with the newly created myOffer', function() {
      newMyOffer.name.should.equal('New MyOffer');
      newMyOffer.info.should.equal('This is the brand new myOffer!!!');
    });

  });

  describe('GET /api/myOffers/:id', function() {
    var myOffer;

    beforeEach(function(done) {
      request(app)
        .get('/api/myOffers/' + newMyOffer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          myOffer = res.body;
          done();
        });
    });

    afterEach(function() {
      myOffer = {};
    });

    it('should respond with the requested myOffer', function() {
      myOffer.name.should.equal('New MyOffer');
      myOffer.info.should.equal('This is the brand new myOffer!!!');
    });

  });

  describe('PUT /api/myOffers/:id', function() {
    var updatedMyOffer;

    beforeEach(function(done) {
      request(app)
        .put('/api/myOffers/' + newMyOffer._id)
        .send({
          name: 'Updated MyOffer',
          info: 'This is the updated myOffer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMyOffer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMyOffer = {};
    });

    it('should respond with the updated myOffer', function() {
      updatedMyOffer.name.should.equal('Updated MyOffer');
      updatedMyOffer.info.should.equal('This is the updated myOffer!!!');
    });

  });

  describe('DELETE /api/myOffers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/myOffers/' + newMyOffer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when myOffer does not exist', function(done) {
      request(app)
        .delete('/api/myOffers/' + newMyOffer._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
