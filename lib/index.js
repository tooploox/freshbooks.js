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
  var string = xml.toString();

  var options = {
      host: url.parse(this.url).hostname
    , port: url.parse(this.url).port
    , path: url.parse(this.url).path
    , method: 'POST'
    , headers: {
      'Content-Length': string.length
      , 'Authorization': 'Basic ' + new Buffer(this.token + ':X').toString('base64')
    }
  };

  var req = https.request(options, function(res) {
    var res_string = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      res_string += chunk;
    });

    res.on('end', function() {
      xml = libxml.parseXmlString(res_string);
      fn(null, xml);
    });
  });

  req.on('error', function(err) {
    fn(new Error("CANNOT CONNECT TO FRESHBOOKS"));
  });

  req.write(string);
  req.end();
};

FreshBooks.prototype.Invoice = function() {
  var invoice = new Invoice(this);
  
  return invoice;
};

//FreshBooks.prototype.Invoice = Invoice;
