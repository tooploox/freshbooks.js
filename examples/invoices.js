var FreshBooks = require('../');
/**
 * Exposes FreshBooks HTTP Client.
 * 
 * @param {String} url
 * @param {String} token
 * @api public
 */

var freshbooks = new FreshBooks("https://freshbooksjs.freshbooks.com/api/2.1/xml-in","59dbd7310470641ff2332bd016ac2e4e")
  , invoice = new freshbooks.Invoice();

/**
 * Gets an Invoice.
 * 
 * @param {Number} id
 * @param {Function} fn
 */
 
invoice.get(4368, function(err, invoice) {
  if(err) {
    console.log(err);
  } else {
    console.log(invoice.invoice_id);
  }
});

/**
 * List Invoices.
 * 
 * @param {Array} options
 * @param {Function} fn
 */
 
invoice.list({client_id: 2},function(err,invoices) {
  if(err) {
    console.log(err);
  } else {
    invoices.forEach(function(invoice) {
      console.log(invoice.invoice_id);
    });
  }
});

/**
 * Creates an Invoice.
 * 
 * @param {Function} fn
 */
 
invoice.client_id = 2;

invoice.lines.push({name: 'Test'
                  , unit_cost: '5.00'
                  , quantity: '5'
                  , type: 'Item'});

invoice.create(function(err, invoice) {
  if(err) {
    console.log(err);
  } else {
    console.log(invoice.invoice_id);
  }
});