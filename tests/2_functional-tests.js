const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    suite("Integration/functional tests (chai-http)", function() {

        // #1 - input: 10L
        test("Valid request - convert 10L", function(done) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end( function(err, res) { 
                assert.equal(res.status, 200); 
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.approximately(res.body.returnNum, 2.64172, 0.001);
                assert.equal(res.body.returnUnit, "gal");
                done();
            });
        });

        // #2 - input: 32g
        test("Invalid unit - convert 32g", function(done) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end( function(err, res) {
                assert.equal(res.status, 200); 
                assert.equal(res.text, "invalid unit");
                done();
            });
        });

        // #3 - input: 3/7.2/4kg
        test("Invalid number - convert 3/7.2/4kg", function(done) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end( function(err, res) {
                assert.equal(res.status, 200); 
                assert.equal(res.text, "invalid number");
                done();
            });
        });

        // #4 - input: 3/7.2/4kilomegagram
        test("Invalid input - convert 3/7.2/4kilomegagram", function(done) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end( function(err, res) {
                assert.equal(res.status, 200); 
                assert.equal(res.text, "invalid number and unit");
                done();
            });
        });

        // #5 - input: kg
        test("Missing number - convert kg", function(done) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end( function(err, res) { 
                assert.equal(res.status, 200); 
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.approximately(res.body.returnNum, 2.20462, 0.001);
                assert.equal(res.body.returnUnit, "lbs");
                done();
            });
        });
    });
});
