var mongodb= require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017/fakedata";
var records = [];
var record = {};
var faker = require('faker');
for (var i = 0; i <=400000; i++){
	record.firstName = faker.name.firstName();
	record.lastName = faker.name.lastName();
	record.address = faker.address.country();
	record.email = faker.internet.email();
	record.mobile = faker.phone.phoneNumber();
	record.price = faker.commerce.price();
	records[i] = record;
	record = {};
}

MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('products');
    records.forEach(function(record) {
    	collection.insert(record, function(err, result) {
    		if(err) { throw err; }
  		});
   	});
});
