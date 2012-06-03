var libxml = require('libxmljs');

/**
 * Creates a new Invoice.
 * 
 * @param {FreshBooks} FreshBooks
 * @return {Invoice}
 * @api public
 */
 
var Invoice = module.exports = function(FreshBooks) {
  this.freshbooks = FreshBooks
, this.lines = []
, this.links = [];
};

/** Creates a new Invoice Line.
 * 
 * @return {Line}
 * @api private
 */
 
var Line = function() {
  
};

/**
 * Constructs XML requests for the API depending on method.
 * 
 * @param {String} method
 * @param {Array} options
 * @param {Function} fn
 * @api private
 */
 
Invoice.prototype._setXML = function(method, fn) {
  var xml = new libxml.Document()
    , options
    , self = this;
  
  //If second argument not a function then we have been passed the 'options' for invoice.list, invoice.lines.add or invoice.lines.update
  if("function" == typeof arguments[2]) {
    options = arguments[1];
    fn = arguments[2];
  }
  
  var request = xml.node("request").attr("method", method);
  
  switch(method) {
    case "invoice.create":
      
    case "invoice.update":
      var invoice = request.node("invoice")
        , lines = invoice.node("lines");
        
      if(this.client_id)
        invoice.node("client_id").text(this.client_id);
      if(this.contact_id)
        invoice.node("contacts").node("contact").node("contact_id").text(this.contact_id);
      if(this.invoice_id)
        invoice.node("invoice_id").text(this.invoice_id);
      if(this.number)
        invoice.node("number").text(this.number);
      if(this.status)
        invoice.node("status").text(this.status);
      if(this.date)
        invoice.node("date").text(this.date);
      if(this.po_number)
        invoice.node("po_number").text(this.po_number);
      if(this.discount)
        invoice.node("discount").text(this.discount);
      if(this.notes)
        invoice.node("notes").text(this.notes);
      if(this.currency_code)
        invoice.node("currency_code").text(this.currency_code);
      if(this.language)
        invoice.node("language").text(this.language);
      if(this.terms)
        invoice.node("terms").text(this.terms);
      if(this.return_uri)
        invoice.node("return_uri").text(this.return_uri);
      if(this.first_name)
        invoice.node("first_name").text(this.first_name);
      if(this.last_name)
        invoice.node("last_name").text(this.last_name);
      if(this.organization)
        invoice.node("organization").text(this.organization);
      if(this.p_street1)
        invoice.node("p_street1").text(this.p_street1);
      if(this.p_street2)
        invoice.node("p_street2").text(this.p_street2);
      if(this.p_city)
        invoice.node("p_city").text(this.p_city);
      if(this.p_state)
        invoice.node("p_state").text(this.p_state);
      if(this.p_country)
        invoice.node("p_country").text(this.p_country);
      if(this.p_code)
        invoice.node("p_code").text(this.p_code);
      if(this.vat_name)
        invoice.node("vat_name").text(this.vat_name);
      if(this.vat_number)
      invoice.node("vat_number").text(this.vat_number);
            
      this.lines.forEach(function(a) {
        var line = lines.node("line");
        
        if(a.name)
          line.node("name").text(a.name);
        if(a.description)
          line.node("description").text(a.description);
        if(a.unit_cost)
          line.node("unit_cost").text(a.unit_cost);
        if(a.quantity)
          line.node("quantity").text(a.quantity);
        if(a.tax1_name)
          line.node("tax1_name").text(a.tax1_name);
        if(a.tax2_name)
        line.node("tax2_name").text(a.tax2_name);
        if(a.tax1_percent)
          line.node("tax1_percent").text(a.tax1_percent);
        if(a.tax2_percent)
        line.node("tax2_percent").text(a.tax2_percent);
        if(a.type)
          line.node("type").text(a.type);
      }); 
    break;
      
    case "invoice.get":
      
    case "invoice.sendBySnailMail":
      
    case "invoice.sendByEmail":  
      
    case "invoice.delete":    
      request.node("invoice_id").text(self.invoice_id);
    break;
    
    case "invoice.list":
      if(options.client_id)
        request.node("client_id").text(options.client_id);
      if(options.recurring_id)  
        request.node("recurring_id").text(options.recurring_id);
      if(options.status)
        request.node("status").text(options.status);
      if(options.number)
        request.node("number").text(options.number);
      if(options.date_from)
        request.node("date_from").text(options.date_from);
      if(options.date_to)
        request.node("date_to").text(options.date_to);
      if(options.updated_from)
        request.node("updated_from").text(options.updated_from);
      if(options.updated_to)
        request.node("updated_to").text(options.updated_to);
      if(options.page)
        request.node("page").text(options.page);
      if(options.per_page)
        request.node("per_page").text(options.per_page);
      if(options.folder)
        request.node("folder").text(options.folder);    
    break;
  }

  fn(xml);
};

/**
 * Sets Invoice properties from results of XML request.
 * 
 * @param {Document} xml
 * @param {Function} fn
 * @api private
 */
 
Invoice.prototype._getXML = function(xml, fn) {
 var self = this;
 
 //TODO: Can we map parameters rather than explicitly defining them?
  this.client_id = xml.get("//xmlns:client_id",this.freshbooks.ns).text();
  this.contact_id = xml.get("//xmlns:contact_id",this.freshbooks.ns).text();
  this.invoice_id = xml.get("//xmlns:invoice_id",this.freshbooks.ns).text();
  this.number = xml.get("//xmlns:number",this.freshbooks.ns).text();
  this.status = xml.get("//xmlns:status",this.freshbooks.ns).text();
  this.amount = xml.get("//xmlns:amount",this.freshbooks.ns).text();
  this.amount_outstanding = xml.get("//xmlns:amount_outstanding",this.freshbooks.ns).text();
  this.folder = xml.get("//xmlns:folder",this.freshbooks.ns).text();
  this.links.client_view = xml.get("//xmlns:client_view",this.freshbooks.ns).text();
  this.links.view = xml.get("//xmlns:view",this.freshbooks.ns).text();
  this.links.edit = xml.get("//xmlns:edit",this.freshbooks.ns).text();
  this.updated = xml.get("//xmlns:updated",this.freshbooks.ns).text();
  this.recurring_id = xml.get("//xmlns:recurring_id",this.freshbooks.ns).text();
  this.staff_id = xml.get("//xmlns:staff_id",this.freshbooks.ns).text();
  this.date = xml.get("//xmlns:date",this.freshbooks.ns).text();
  this.po_number = xml.get("//xmlns:po_number",this.freshbooks.ns).text();
  this.discount = xml.get("//xmlns:discount",this.freshbooks.ns).text();
  this.notes = xml.get("//xmlns:notes",this.freshbooks.ns).text();
  this.currency_code = xml.get("//xmlns:currency_code",this.freshbooks.ns).text();
  this.language = xml.get("//xmlns:language",this.freshbooks.ns).text();
  this.terms = xml.get("//xmlns:terms",this.freshbooks.ns).text();
  this.return_uri = xml.get("//xmlns:return_uri",this.freshbooks.ns).text();
  this.first_name = xml.get("//xmlns:first_name",this.freshbooks.ns).text();
  this.last_name = xml.get("//xmlns:last_name",this.freshbooks.ns).text();
  this.organization = xml.get("//xmlns:organization",this.freshbooks.ns).text();
  this.p_street1 = xml.get("//xmlns:p_street1",this.freshbooks.ns).text();
  this.p_street2 = xml.get("//xmlns:p_street2",this.freshbooks.ns).text();
  this.p_city = xml.get("//xmlns:p_city",this.freshbooks.ns).text();
  this.p_state = xml.get("//xmlns:p_state",this.freshbooks.ns).text();
  this.p_country = xml.get("//xmlns:p_country",this.freshbooks.ns).text();
  this.p_code = xml.get("//xmlns:p_code",this.freshbooks.ns).text();
  this.vat_name = xml.get("//xmlns:vat_name",this.freshbooks.ns).text();
  this.vat_number = xml.get("//xmlns:vat_number",this.freshbooks.ns).text();
  
  xml.find("//xmlns:line",this.freshbooks.ns).forEach(function(a) {
    var line = new Line();
    line.line_id = a.get("//xmlns:line_id",self.freshbooks.ns).text();
    line.name = a.get("//xmlns:name",self.freshbooks.ns).text();
    line.description = a.get("//xmlns:description",self.freshbooks.ns).text();
    line.unit_cost = a.get("//xmlns:unit_cost",self.freshbooks.ns).text();
    line.quantity = a.get("//xmlns:quantity",self.freshbooks.ns).text();
    line.tax1_name = a.get("//xmlns:tax1_name",self.freshbooks.ns).text();
    line.tax2_name = a.get("//xmlns:tax2_name",self.freshbooks.ns).text();
    line.tax1_percent = a.get("//xmlns:tax1_percent",self.freshbooks.ns).text();
    line.tax2_percent = a.get("//xmlns:tax2_percent",self.freshbooks.ns).text();
    line.type = a.get("//xmlns:type",self.freshbooks.ns).text();
    
    self.lines.push(line);
  });
  
  fn();
};

/**
 * Creates an Invoice.
 * 
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.create = function(fn) {
  var self = this;
  
  this._setXML("invoice.create", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT CREATE INVOICE: " + err));
      } else {
        fn(null, self);
      }
    });
  });
};

/**
 * Updates an Invoice.
 * 
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.update = function(fn) {
  var self = this;
  
  this._setXML("invoice.update", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT CREATE INVOICE: " + err));
      } else {
        fn(null, self);
      }
    });
  });
};

/**
 * Gets an Invoice.
 * 
 * @param {Number} id
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.get = function(id, fn) {
  var self = this;

  this.invoice_id = id;
  this._setXML("invoice.get", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT GET INVOICE: " + err));
      } else {
        self._getXML(xml, function() {
          fn(null, self);
        });
      }
    });
  });
};

/**
 * Deletes an Invoice.
 * 
 * @param {Number} id
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.delete = function(id, fn) {
  var self = this;
  
  this.invoice_id = id;
  this._setXML("invoice.delete", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT DELETE INVOICE: " + err));
      } else {
        //TODO: Do we return 'this' or do we delete the data and/or object?
        fn(null, self);
      }
    });
  });
};

/**
 * List Invoices.
 * 
 * @param {Array} options
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.list = function(options, fn) {
  var self = this
    , invoices = [];
    
  this._setXML("invoice.list", options, function(xml) {
    
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT LIST INVOICES: " + err));
      } else {
        /* TODO Add in page, per_page, pages, total attributes */
        xml.find("//xmlns:invoice", self.freshbooks.ns).forEach(function(a) {
          var invoice = self.freshbooks.Invoice();
        
          //TODO Use XML builder rather than string concat.
          xml = libxml.parseXmlString('<?xml version="1.0" encoding="UTF-8"?>' + '<response xmlns="http://www.freshbooks.com/api/" status="ok">' + a.toString() + '</response>');
          invoice._getXML(xml, function() {
            invoices.push(invoice);
          });
        });
        
        fn(null, invoices);
      }
    });
  });
  //TODO Do we want to 'return invoices;' ?
};

/**
 * Send Invoice by email.
 * 
 * @param {Function} fn
 * @api public
 */
 
Invoice.prototype.sendByEmail = function(fn) {
  //TODO Implement Custom email.
  var self = this;
  
  this._setXML("invoice.sendByEmail", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT SEND INVOICE BY EMAIL: " + err));
      } else {
        fn(null, self);
      }
    });
  });
};

/**
 * Send Invoice by mail.
 * 
 * @param {Function} fn
 * @api public
 */

Invoice.prototype.sendBySnailMail = function(fn) {
  var self = this;
  
  this._setXML("invoice.sendBySnailMail", function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if(err) {
        fn(err);
      } else if("ok" != xml.get("//xmlns:response",self.freshbooks.ns).attr("status").value()) {
        err = xml.get("//xmlns:error",self.freshbooks.ns).text();
        fn(new Error("CANNOT SEND INVOICE BY SNAIL MAIL: " + err));
      } else {
        fn(null, self);
      }
    });
  });
};