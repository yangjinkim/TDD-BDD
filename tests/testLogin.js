var should = require('chai').should(),
    request = require('supertest');

request = request('http://localhost:3000');

// connect to mongoose
var mongoose = require('mongoose'),
    nconf = require('nconf');

nconf.env().argv().file({file: './config/config.json'});
require('../models/user');

var env = nconf.get(process.env.NODE_ENV);

// test suite
describe('GET /', function() {

  it('should return 200', function(done) {

    request.get('/').
      expect(200).
      expect('Content-Type', 'text/html; charset=utf-8').
      end(function(err, res) {
	should.not.exist(err);
	done();
      });
  });
});

describe('POST /', function() {

  var userModel = mongoose.model('user');

  before(function(done) {
    mongoose.connect(env.database, function(err) {
      should.not.exist(err);
      done();
    });
  });

  after(function(done){
    mongoose.disconnect(function(err) {
      should.not.exist(err);
      done();
    });
  });

  beforeEach(function(done) {
    userModel.remove({}, function(err){
      should.not.exist(err);

      // add dummy user
      var sampleUser = new userModel({
        id: "yangjin",
        password: "2232323",
        email: "yangjinkim@gmail.com",
        name: "dfdfdfdfdf",
        age: "25"
      });

      sampleUser.save(function(err) {
	should.not.exist(err);
	  done();
      });
    });  
  });

  it('should return 200 when user logged in',
     function(done){
       request.post('/').
	 expect(200).
	 send({
           userId: "yangjin", 
           userPassword: "2232323"
	 }).
	 end(function(err, res) {
	   should.not.exist(err);
	   done();
	 });
     });
});
