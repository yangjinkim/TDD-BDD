
var should = require('chai').should(),
    request = require('supertest'),
    request = request('http://localhost:3000');

describe('users api', function() {
  it('should return status code 200, user object as json', function(done) {
    request.get('/users/me').
    expect(200).
    expect('Content-Type', /json/).
    end(function(err, res) {

      should.not.exist(err);
      
      var user = JSON.parse(res.text);
      
      user.should.have.property('id');
      user.should.have.property('username');
      user.should.have.property('email');
      user.should.have.property('age');

      done();
    });
  });
});
