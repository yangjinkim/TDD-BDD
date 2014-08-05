var should = require('chai').should(),
    request = require('supertest'),
    request = request('http://localhost:3000');

var mongoose = require('mongoose'),
    nconf = require('nconf');

// Here : /
nconf.env().argv().file({file: './config/config.json'});
require('../models/user');

var env = nconf.get(process.env.NODE_ENV);

mongoose.connect(env.database, function(err) {
  should.not.exist(err);
});

describe('GET /signup', function() {
  it('should render signup page', function (done) {
    request.get('/signup').
    expect(200).
    expect('Content-Type', 'text/html; charset=utf-8').
    end(function(err, res) {
      should.not.exist(err);
      done();
    });
  });

});

describe('POST /signup validation', function() {
  it('should return 400 when no parameter', function(done) {
    request.post('/signup').
      expect(400).
      end(function(err, res) {
        should.not.exist(err); 
        done();   
      });
  });

  it('should return 400 if name is not alphablet', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdf1dfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if email is too long', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "2232323",
        userEmail: "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddafasdfasdfasdfrwearaetasdgasdfasfasfasdfasdfaerasdfasdfasdfasdfsadfsadfasdfsadfasdfsadfsdafdfadsfasdfdasfdasfehdhdhdhhdhehehdhhdfjdhfjdhfjdhfjdhfjdhfjdhjfdhfjdhfjdhejrhjerhjerhjhdjfhajsdfhajsdfhjehrjehjrhejrhejrhejrhjehrjehrjehrjehrjehrjehrjehrjehjrhejrhjdhdhdhdhdhdddddddddddddddddddddddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });


  it('should return 400 if email is not valid form', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "2232323",
        userEmail: "dddgmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });


  it('should return 400 if id is not alphanumeric', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji  1n",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if id is empty', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if id is longer than 15', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "1234567890123456",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

 it('should return 400 if id is shorter than 5', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "1234",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  }); 

  it('should return 400 if password is empty', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

 it('should return 400 if password is shorter than 5', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "dddfdfd",
        userPassword: "1234",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if password is longer than 15', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "123ddf4",
        userPassword: "d1234567890123456",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "14"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if age is not int', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "" 
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });

  it('should return 400 if age is not int', function(done){
    request.post('/signup')
      .expect(400)
      .send({
        userId: "yangji1n",
        userPassword: "2232323",
        userEmail: "ddd@gmail.com",
        userName: "dfdfdfdfdf",
        userAge: "df4"
      })
      .end(function(err, res){
        should.not.exist(err);
        done();
      });  
  });
});

describe('POST /signup failed', function() {
  var userModel = mongoose.model('user');

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

  it('should return 409 conflict HTTP code when user already exists',
     function(done) {
       request.post('/signup')
	 .expect(409)
	 .send({
           userId: "yangjin", 
           userPassword: "481AmFMA",
           userEmail: "yj@gmail.com",
           userName: "gimYangJin",
           userAge: "25"
	 })
	 .end(function(err, res){
           should.not.exist(err);
           done();
	 });
     });
});


describe('POST /signup success', function () {

  var userModel = mongoose.model('user');

  beforeEach(function(done) {
    userModel.remove({}, function(err){
      should.not.exist(err);
      done();
    });  
  });

  it('should return 201 when user is created', function(done) {
    request.post('/signup')
      .expect(201)
      .send({
        userId: "yanjin", 
        userPassword: "481AmFMA",
        userEmail: "yj@gmail.com",
        userName: "gimYangJin",
        userAge: "25"
      })
      .end(function(err, res){
        should.not.exist(err);
        
        userModel.find({id: 'yanjin'}, function (err, docs) {
          should.not.exist(err);
          (docs.length).should.be.equal(1);
	  mongoose.connection.close();
          done();
        });

      });
  });
});
