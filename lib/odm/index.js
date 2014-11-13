var create = require('./create');

module.exports = function (uri) {
  return {
    create: create(uri)
  }
};