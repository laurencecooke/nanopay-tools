var tools = require('../index');
var should = require('should');

// Test spec
describe('Nanopay Tools', function () {
    var fakeModel;

    beforeEach(function () {
        fakeModel = {
            disableRemoteMethod: function (method) {
                this[method] = false;
            }
        };
    });

    it('should disable a list of remote methods', function (done) {
        tools.disableRemotes(fakeModel, ['find', 'upsert']);

        fakeModel.should.be.ok;
        fakeModel.find.should.be.false;
        fakeModel.upsert.should.be.false;

        done();
    });

    it('should disable all default remote methods except ones on the list', function (done) {
        fakeModel.find = function () {};

        tools.disableExcept(fakeModel, ['find']);

        fakeModel.should.be.ok;

        fakeModel.create.should.be.false;
        fakeModel.upsert.should.be.false;

        fakeModel.find.should.be.ok;

        done();
    });

});