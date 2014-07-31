var should = require('should'),
    request = require('supertest'),
    request = request('http://localhost:3000');

describe('signup page', function() {
  it('should render signup page', function (done) {
    request.get('/signup').
    expect(200).
    expect('Content-Type', 'text/html; charset=utf-8').
    end(function(err, res) {
      should.not.exist(err);
      done();
    });
  })
});

    
