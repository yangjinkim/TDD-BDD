var should = require('chai').should(),
    request = require('supertest'),
    request = request('http://localhost:3000');

describe('/mail API', function() {
  describe('GET /mail', function() {
    it('should return 200 OK', function(done) {
      request.get('/mail').
	expect(200).
	expect('Content-Type', 'text/html; charset=utf-8').
	end(function(err, res) {
	  should.not.exist(err);
	  done();
	});
    });
  });
});
