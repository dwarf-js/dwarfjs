var dwarfCreate = require('../../../lib/odm/create');

describe('dwarf.create', function () {
  given('a instance of dwarf.create for a collection called company', function () {
    this.dwarfCreate = dwarfCreate(global.config.mongoUri, 'companies');
  }, function () {
    when("I create a company called Jim's thrills and spills and find it with the mongo driver", function (done) {
      var _this = this;
      this.dwarfCreate({ "name": "Jim's thrills and spills" }).then(function (company) {
        db().then(function (db) {
          db.collection('companies').findOne({ _id: company._id }, function (err, company) {
            _this.company = company;
            db.close();
            done();
          });
        });
      });
    }, function () {
      then("The companies collection should contain a new record Jim's thrills and spills", function () {
        expect(this.company.name).to.eq("Jim's thrills and spills");
      });
    });

    when('I create a company called Handicar and find it with the mongo driver', function (done) {
      var _this = this;
      this.dwarfCreate({ "name": "Handicar" }).then(function (company) {
        db().then(function (db) {
          db.collection('companies').findOne({ _id: company._id }, function (err, company) {
            _this.company = company;
            db.close();
            done();
          });
        });
      });
    }, function () {
      then('The companies collection should contain a new record Handicar', function () {
        expect(this.company.name).to.eq('Handicar');
      });
    });
  });
});
