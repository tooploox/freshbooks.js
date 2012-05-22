var Invoice = require('./Invoice')
  , url = require('url')
  , libxml = require('libxmljs')
  , https = require('https');

var FreshBooks = module.exports = function(url, token) {
  this.token = token;
  this.url = url;
  
  FreshBooks.prototype.token = token;
  FreshBooks.prototype.url = url;
};

FreshBooks.prototype.get = function(xml, fn) {
  var options = {
      host: url.parse(this.url).hostname
    , port: url.parse(this.url).port
    , path: url.parse(this.url).path
    , method: 'POST'
    , headers: {
      authorization: 'Basic ' + new Buffer(this.token + ':X').toString('base64')
    }
  };

/*TODO: Is http.request the same syntax as https.request?*/
  var request = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      if(xml = libxml.parseXmlString(chunk)) {
        fn(null, xml);
      } else {
        fn(new Error("CANNOT READ XML"));
      }
    });
  });
  
  request.write(xml.toString());
  request.end();
};

FreshBooks.prototype.Invoice = function() {
  var invoice = new Invoice(this);
  
  return invoice;
};

//FreshBooks.prototype.Invoice = Invoice;