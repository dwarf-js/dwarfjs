var Q = require('q')
  , _ = require('lodash')
  , ObjectID = require('mongodb').ObjectID
  , mongo = require('mongodb').MongoClient
  , create;

function connect(uri) {
  return Q.Promise(function (resolve, reject) {
    mongo.connect(uri, function (err, db) {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

create = _.curry(function create(uri, collection, doc) {
  return Q.Promise(function(resolve, reject) {
    connect(uri).then(function (db) {
      db.collection(collection).save(doc, function (err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
        db.close();
      }, reject);
    });
  });
});

module.exports = create;