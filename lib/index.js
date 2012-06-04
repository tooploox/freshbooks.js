var Invoice = require('./Invoice')
  , Estimate = require('./Estimate')
  , Category = require('./Category')
  , Client = require('./Client')
  , Expense = require('./Expense')
  , url = require('url')
  , libxml = require('libxmljs')
  , https = require('https');

/**
 * Exposes FreshBooks HTTP Client.
 * 
 * @param {String} url
 * @param {String} token
 * @api public
 */

var FreshBooks = module.exports = function(url, token) {
if (!(this instanceof arguments.callee))
   throw new Error("FRESHBOOKS MUST BE CALLED WITH NEW KEYWORD");
      
  
  //TODO This needs to be done better!
  this.url = url;
  this.token = token;
  this.ns = "http://www.freshbooks.com/api/";
  
  FreshBooks.prototype.token = this.token;
  FreshBooks.prototype.url = this.url;
  FreshBooks.prototype.ns = this.ns;
  
  return this;
};

/**
 * Retrieves XML response from Freshbooks API.
 * 
 * @param {Document} xml
 * @param {Function} fn
 * @api private
 */
 
FreshBooks.prototype._get = function(xml, fn) {
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
    string = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      string += chunk;
    });

    res.on('end', function() {
      xml = libxml.parseXmlString(string);
      
      fn(null, xml);
    });
  });

  req.on('error', function(err) {
    fn(new Error("CANNOT CONNECT TO FRESHBOOKS:" + err));
  });

  req.write(string);
  req.end();
}

/**
 * Exposes Invoice object.
 * 
 * @api public
 */
 
FreshBooks.prototype.Invoice = function() {
  return new Invoice(this);
}

/**
 * Exposes Estimate object.
 * 
 * @api public
 */
 
FreshBooks.prototype.Estimate = function() {
  return new Estimate(this);
}

/**
 * Exposes Category object.
 * 
 * @api public
 */
 
FreshBooks.prototype.Category = function() {
  return new Category(this);
}

/**
 * Exposes Client object.
 * 
 * @api public
 */
 
FreshBooks.prototype.Client = function() {
  return new Client(this);
}

/**
 * Exposes Expense object.
 * 
 * @api public
 */
 
FreshBooks.prototype.Expense = function() {
  return new Expense(this);
}