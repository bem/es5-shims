modules.define('spec', ['sinon'], function(provide, sinon) {

describe('ecma__date', function() {
    describe('now', function() {
        afterEach(function() {
            var getTime = Date.prototype.getTime;
            getTime.restore && getTime.restore();
        });

        it('should return current epoch time in ms', function() {
            sinon.stub(Date.prototype, 'getTime', function() { return 42; });
            Date.now().should.be.equal(42);
        });
    });
});

provide();

});
