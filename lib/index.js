var odm = require('./odm');

function connect(uri) {
  return odm(uri);
};

module.exports = { connect: connect };
