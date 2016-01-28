// jshint expr: true
  var chai = require('chai')
  , chaiHttp = require('chai-http')
  , mongoose = require('mongoose')
  , config = require('../config/server')
  , connectToMongo = require('../lib/mongoose')
;

chai.use(chaiHttp);

var express = require('../lib/express')(config.publicFolder, true);
url = express.listen(config.port);

var request = chai.request
  , expect = chai.expect
  , should = chai.should();

describe('Roteando', function() {
  var url = 'http://localhost:' + config.port + '/';
  before(function(done) {
    connectToMongo('mongodb://' + config.db.ip + '/' + config.db.name, true);
    done();
  });

  var matchId;

  describe('Partida', function() {

    it('deve ser criada', function(done) {
      var match = {
        dice: [1, 1]
      };
      request(url)
        .post('api/partidas')
        .send(match)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          matchId = res.body._id;
          done();
        });
    });

    it('deve ser atualizada da maneira correta', function(done) {
      var match = {
        dice: [2, 2]
      };
      request(url)
      .put('api/partidas/' + matchId)
      .send(match)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body.ok).to.be.equal(1);
        done();
      });
    });

    it('deve ser removida', function(done) {
      request(url)
      .delete('api/partidas/' + matchId)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('Dados', function(done){
    var dnow;

    before(function(done){
      var match = {
        dice: [1, 4]
      };
      dnow = [1, 4];
      request(url)
        .post('api/partidas')
        .send(match)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          matchId = res.body._id;
          done();
        });
    });

    after(function(done){
      request(url)
      .delete('api/partidas/' + matchId)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('devem ser listados', function(done) {
      request(url)
        .get('api/partidas/' + matchId + '/dados')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body[0]).to.be.equal(1);
          expect(res.body[1]).to.be.equal(4);
          done();
        });
    });

    context('quando rolados', function(done) {
      
      /*
      it('devem ser diferentes', function(done) {
        request(url)
          .get('api/partidas/' + matchId + '/dados/rolar')
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            expect(res).to.have.status(200);
            expect(res.body[0]).to.not.equal(dnow[0]);
            expect(res.body[1]).to.not.equal(dnow[1]);
            done();
          });
      });
      */

      it('devem estar entre 1 e 6', function(done) {
        request(url)
          .get('api/partidas/' + matchId + '/dados/rolar')
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            expect(res).to.have.status(200);
            expect(res.body[0]).to.be.above(0).and.below(7)
            expect(res.body[1]).to.be.above(0).and.below(7)
            done();
          });
      });
    });
  });
});
