var FreshBooks = require('../lib/freshbooks'),
    freshbooks,
    invoice;

freshbooks = new FreshBooks("https://{NAME}.freshbooks.com/api/2.1/xml-in","{TOKEN}");

invoice = new freshbooks.invoice();

/* TODO: Do we want to get like tthis or invoice.get(100, function() { ... }); ?*/
invoice.invoice_id=100;
invoice.get(function() {
  console.log(this.number);
});

