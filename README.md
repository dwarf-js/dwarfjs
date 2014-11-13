# Dwarf

Dwarf is a promise based micro ODM for mongodb it is designed to simplify basic interactions with collections.

# Using dwarf

```javascript
    var dwarf = require('dwarf')
      , companies;

    dwarf.connect('mongodb://localhost:27017/test');

    companies = dwarf.collection('companies');

    // Create a new company
    companies.create({
      'name': 'Beer co.',
      'slogan': '99 bottles of beer on the wall'
    }).then(function (company) {
      // { 'id': 'ObjectId', 'name': 'Beer co.', 'slogan': '99 bottles of beer on the wall' }
      console.log(company);
    }, oops);

    // Get all the companies
    companies.find().then(function (companies) {
      // [ { 'id': 'ObjectId', name': 'Beer co.', 'slogan': '99 bottles of beer on the wall' } ]
      console.log(companies); 
    }, oops); 


    // Update a company
    companies.update(ObjectID,{ 'slogan': '98 bottles of beer on the wall' }).then(function (company) {
      // { 'id': 'ObjectId', 'name': 'Beer co.', 'slogan': '98 bottles of beer on the wall' }
      console.log(company);
    }, oops);

    // Find a company
    companies.findById(ObjectID).then(function (company) {
      // { 'id': 'ObjectId', 'name': 'Beer co.', 'slogan': '98 bottles of beer on the wall' }
      console.log(company);
    }, oops);

    // Remove a company
    companies.remove(ObjectID).then(function (success) {
      // true
      console.log(success);
    }, oops);


    function oops(err) {
      console.log('something broke');
    }


```

## Validation 

Validation works like a pipeline that eventually spits out a error object.

```javascript
    companies = dwarf.collection('companies');

    function iDoNothing(context, resolve, reject) {
      resolve();
    }

    function iAddAnErrorForAge(context, resolve, reject) {
      reject({ "age": "Company must be older than 1 year" });
    }

    function notEmpty(field) {
      return function (context, resolve, reject) {
        var error = {};
        
        error[field] = field + ' must not be empty!' 

        if (context[field] !== '') {
          resolve();
        } else {
          reject(reject);
        }
      };
    }

    companies.validate(iDoNothing, iAddAnErrorForAge, notEmpty('name'), notEmpty('slogan'));

    companies.create({
      'name': 'Beer co.'
    }).then(function () {}, function (err) {
      // [ { age: "Company must be older than 1 year" }, { slogan: 'slogan must not be empty!'} ] 
      console.log(err);
    });

    // The benefit of this is that complex validations become simple to implement
    function complex(context, resolve, reject) {
      var hasName = !!context.name
        , hasSlogan = !!context.slogan;

      if (hasName && hasSlogan) {
        if (age > 2) {
          reject({ "age": "YOUR SLOGAN SUCKS!" }) 
        } else {
          reject({ "age": "YOU AREN'T OLD ENOUGH FOR A SLOGAN YET KID" })
        }
      } else {
        resolve();
      } 
    }
```
