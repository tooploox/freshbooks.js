var https = require('https')
  , url = require('url')
  , libxmljs = require('libxmljs')
  , Invoice = require('./Invoice');

var FreshBooks = function() {
  var url
    , token;
    
  return this;
};

/* TODO Need to work out if the constructor is here on in above? */
FreshBooks.prototype.FreshBooks = function(url, token) {
  this.url = url;
  this.token = token;
};

FreshBooks.prototype.get = function(xml, fn) {
  var xml, string, options = {
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
      if(xml = libxmljs.parseXmlString(chunk)) {
        fn(null, xml);
      } else {
        fn(new Error("CANNOT READ XML"));
      }
    });
  });
  
  string = xml.toString();
  request.write(string);
  request.end();
};

FreshBooks.prototype.Invoice = Invoice;

module.exports = exports = FreshBooks;

