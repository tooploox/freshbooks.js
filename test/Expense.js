var assert = require('assert')
  , FreshBooks = require('../');

describe('Expense', function() {
  var freshbooks = new FreshBooks("https://freshbooksjs.freshbooks.com/api/2.1/xml-in","59dbd7310470641ff2332bd016ac2e4e")
    , expense = freshbooks.Expense();

  describe("create()", function() {
    it("should create a new expense", function(done) {
      expense.client_id = 2;

      expense.lines.push({name: 'Test'
                        , unit_cost: '5.00'
                        , quantity: '5'
                        , type: 'Item'});

      expense.create(function(err, expense) {
        done(err);
      });
    });
  });

  describe("update()", function() {
    it("should update an expense", function(done) {
      expense.notes = "Lorem Ipsum";
      expense.update(function(err, expense) {
        done(err);
      });
    });
  });

  describe("get()", function() {
    it("should get an expense", function(done) {
      expense.get(expense.expense_id, function(err, expense) {
        done(err);
      });
    });
  });  

  describe("list()", function() {
    it("should list an array of expenses", function(done) {
      expense.list({"client_id": expense.client_id}, function(err, expenses) {
        done(err);
      });
    });
  });

  describe("delete()", function() {
    it("should delete an expense", function(done) {
      expense.delete(function(err, expense) {
        done(err);
      });
    });
  });  
});
