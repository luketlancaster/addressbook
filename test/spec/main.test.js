/* jshint mocha: true, expr: true, strict: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function() {
  it('should return world', function() {
    hello().should.equal('world');
  });
});

describe('addRowsToTable', function() {
  it('should add rows to the table', function() {
    var contact = { FirstName: 'Luke', LastName: 'Lancaster', PhoneNumber: '615-715-5906' };
    $('tr').length.should.equal(0);
    addRowsToTable(contact);
    $('tr').length.should.equal(1);
  });
});

describe('createContactObject', function() {
  it('should create an object with values from the inputs', function() {
    createContactObject(contact);
    
  });
});


