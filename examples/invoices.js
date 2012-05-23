var FreshBooks = require('../'),
    freshbooks,
    invoice;

freshbooks = new FreshBooks("https://concisecreative.freshbooks.com/api/2.1/xml-in","0a6e5ed1a56732cebf7979ed7a3b2417");
//freshbooks = new FreshBooks("https://{NAME}.freshbooks.com/api/2.1/xml-in","{TOKEN}");

invoice = freshbooks.Invoice();

/* TODO: Do we want to get like tthis or invoice.get(100, function() { ... }); ?*/
invoice.get(169532, function() {
  console.log(this.number);
});

