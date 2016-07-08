var mail = require('../index.js');
var base64url = require('base64url');
var assert = require('chai').assert;

describe('Test sendgrid mail template', function() {
	it('should send an email and return HTTP 202', function() {
		mail({
			b: base64url.encode('Hello world'),
			s: base64url.encode('Test subject'),
			t: 'richard@jansenit.com',
			c: 'stormy',
			secrets: {SG_KEY: process.env.SENDGRID_API_KEY}
		}, function(err, response) {
			assert(response.statusCode, 202);
		});
	});
});
