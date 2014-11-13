Q = require('q');
config = require('./config');
chai = require('chai');
expect = chai.expect;
sinon = require('sinon');
chai.use(require('sinon-chai'));
mongodb  = require('mongodb')
ObjectID = global.mongodb.ObjectID;
given = alias('given');
and = alias('and');
when = alias('when');

function alias(theAlias) {
  return function (desc, setup, next) {
    describe(theAlias + ' ' + desc, function () {
      before(setup);
      next();
    });
  }
}

then = function then(desc, next) {
  return it('then ' + desc, next);
}

db = function () {
  return Q.Promise(function (resolve, reject) {
    global.mongodb.MongoClient.connect(global.config.mongoUri, function (err, db) {
      if (err) {
        return reject(err);
      } else {
        return resolve(db);
      }
    });
  });
}

before(function () { });

it('Ensures that the db exists (this will be slow on the first run)', function (done) {
  this.timeout(10000);
  db().then(function (db) {
    db.collection('test').insert([ { name: 'test' } ], function (err) {
      expect(err).to.eq(null);
      db.close();
    });
  }, function (err) {
    expect(err).to.eq(null);
  }).fin(done);
});



