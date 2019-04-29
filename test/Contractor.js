var assert = require("assert"),
  FreshBooks = require("../");

describe("Contractor", function() {
  var freshbooks = new FreshBooks(
      "https://freshbooksjs.freshbooks.com/api/2.1/xml-in",
      "59dbd7310470641ff2332bd016ac2e4e"
    ),
    contractor = new freshbooks.Contractor();

  describe("list()", function() {
    it("should list an array of clients", function(done) {
      contractor.list({}, function(err, clients) {
        done(err);
      });
    });
  });
});
