var libxml = require('libxmljs')

var Invoice = module.exports = function(FreshBooks) {
  /*var invoice_id
  , client_id
  , contact_id
  , number
  , status
  , date
  , po_number
  , discount
  , notes
  , currency_code
  , language
  , terms
  , return_uri
  , first_name
  , last_name
  , organization
  , p_street1
  , p_street2
  , p_city
  , p_state
  , p_country
  , p_code
  , vat_name
  , vat_number
  , lines
  , amount
  , amount_outstanding
  , folder
  , links = {client_view: null, view: null, edit: null}
  , updated
  , recurring_id
  , staff_id;*/

  //this.freshbooks = new Connect(FreshBooks.url, FreshBooks.token);
  this.freshbooks = FreshBooks;
};

//Invoice.prototype.freshbooks = Connect(FreshBooks.url, FreshBooks.token).prototype;


var Line = function() {
  /*var line_id
    , name
    , description
    , unit_cost
    , quantity
    , tax1_name
    , tax2_name
    , tax1_percent
    , tax2_percent
    , type;*/
};

Invoice.prototype._setXML = function(method, fn) {
  var xml, self = this;
  
  switch(method) {
    case "invoice.create":
      
    case "invoice.update":
      xml = new libxml.Document(function(n) {
        n.node("request", {method: method}, function(n) {
          n.node("invoice", function(n) {
            n.node("client_id", self.client_id);
            n.node("contacts", function(n) {
              n.node("contact", function(n) {
                n.node("contact_id", self.contact_id);
              });
            });
            n.node("invoice_id", self.invoice_id);
            n.node("number", self.number);
            n.node("status", self.status);
            n.node("date", self.date);
            n.node("po_number", self.po_number);
            n.node("discount", self.discount);
            n.node("notes", self.notes);
            n.node("currency_code", self.currency_code);
            n.node("language", self.language);
            n.node("terms", self.terms);
            n.node("return_uri", self.return_uri);
            n.node("first_name", self.first_name);
            n.node("last_name", self.last_name);
            n.node("organization", self.organization);
            n.node("p_street1", self.p_street1);
            n.node("p_street2", self.p_street2);
            n.node("p_city", self.p_city);
            n.node("p_state", self.p_state);
            n.node("p_country", self.p_country);
            n.node("p_code", self.p_code);
            n.node("vat_name", self.vat_name);
            n.node("vat_number", self.vat_number);
            
            n.node("lines", function(n) {
              self.lines.foreach(function(e, i, a) {
                n.node("line", function(n) {
                  n.node("name", a.name);
                  n.node("description", a.description);
                  n.node("unit_cost", a.unit_cost);
                  n.node("quantity", a.quantity);
                  n.node("tax1_name", a.tax1_name);
                  n.node("tax2_name", a.tax2_name);
                  n.node("tax1_percent", a.tax1_percent);
                  n.node("tax2_percent", a.tax2_percent);
                  n.node("type", a.type);
                });
              });
            });
          });
        });
      });
    break;
    
    case "sendBySnailMail":
      
    case "sendByEmail":
      
    case "invoice.get":
      
    case "invoice.delete":
      xml = new libxml.Document(function(n) {
        n.node("request", {method: method}, function(n) {
          n.node("invoice_id", self.invoice_id);
        });
      });
    break;
  }

  fn(xml);
};

Invoice.prototype._getXML = function(xml, fn) {
  var self = this;
  
  this.client_id = xml.get("//client_id").text();
  this.contact_id = xml.get("//contact_id").text();
  this.invoice_id = xml.get("//invoice_id").text();
  this.number = xml.get("//number").text();
  this.status = xml.get("//status").text();
  this.amount = xml.get("//amount").text();
  this.amount_outstanding = xml.get("//amount_outstanding").text();
  this.folder = xml.get("//folder").text();
  this.links.client_view = xml.get("//client_view").text();
  this.links.view = xml.get("//view").text();
  this.links.edit = xml.get("//edit").text();
  this.updated = xml.get("//updated").text();
  this.recurring_id = xml.get("//recurring_id").text();
  this.staff_id = xml.get("//staff_id").text();
  this.date = xml.get("//date").text();
  this.po_number = xml.get("//po_number").text();
  this.discount = xml.get("//discount").text();
  this.notes = xml.get("//notes").text();
  this.currency_code = xml.get("//currency_code").text();
  this.language = xml.get("//language").text();
  this.terms = xml.get("//terms").text();
  this.return_uri = xml.get("//return_uri").text();
  this.first_name = xml.get("//first_name").text();
  this.last_name = xml.get("//last_name").text();
  this.organization = xml.get("//organization").text();
  this.p_street1 = xml.get("//p_street1").text();
  this.p_street2 = xml.get("//p_street2").text();
  this.p_city = xml.get("//p_city").text();
  this.p_state = xml.get("//p_state").text();
  this.p_country = xml.get("//p_country").text();
  this.p_code = xml.get("//p_code").text();
  this.vat_name = xml.get("//vat_name").text();
  this.vat_number = xml.get("//vat_number").text();
  
  xml.get("//lines").childNodes().foreach(function(e, i, a) {
    var line = new Line();
    line.line_id = a.get("//line_id").text();
    line.name = a.get("//name").text();
    line.description = a.get("//description").text();
    line.unit_cost = a.get("//unit_cost").text();
    line.quantity = a.get("//quantity").text();
    line.tax1_name = a.get("//tax1_name").text();
    line.tax2_name = a.get("//tax2_name").text();
    line.tax1_percent = a.get("//tax1_percent").text();
    line.tax2_percent = a.get("//tax2_percent").text();
    line.type = a.get("//type").text();
    
    self.lines.push(line);
  });
  
  fn();
};

Invoice.prototype.create = function(fn) {
  var self = this;
  
  this._setXML("invoice.create", function(xml) {
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT CREATE INVOICE"));
      } else {
        fn(null, self);
      }
    });
  });
};

Invoice.prototype.update = function(fn) {
  var self = this;
  
  this._setXML("invoice.update", function(xml) {
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT UPDATE INVOICE"));
      } else {
        fn(null, self);
      }
    });
  });
};

Invoice.prototype.get = function(invoice_id, fn) {
  var self = this;
  
  this.invoice_id = invoice_id;
  this._setXML("invoice.get", function(xml) {
    console.log(xml.toString());
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT GET INVOICE"));
      } else {
        this._getXML(xml, function() {
          fn(null, self);
        });
      }
    });
  });
};

Invoice.prototype.delete = function(invoice_id, fn) {
  var self = this;
  
  this.invoice_id = invoice_id;
  this._setXML("invoice.delete", function(xml) {
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT DELETE INVOICE"));
      } else {
        /*TODO: Do we return 'this' or do we delete the data and/or object?*/
        fn(null, self);
      }
    });
  });
};

Invoice.prototype.list = function(options, fn) {
  var invoices
    , xml = new libxml.Document(function(n) {
      n.node("request", {method: "invoice.list"}, function(n) {
      n.node("client_id", options.client_id);
      n.node("recurring_id", options.recurring_id);
      n.node("status", options.status);
      n.node("number", options.number);
      n.node("date_from", options.date_from);
      n.node("date_to", options.date_to);
      n.node("updated_from", options.updated_from);
      n.node("update_to", options.updated_to);
      n.node("page", options.page);
      n.node("per_page", options.per_page);
      n.node("folder", options.folder);
    });
  });
  
  this.freshbooks.get(xml, function(err, xml) {
    if("ok" != xml.get("//response").attr("status").value() || err) {
      fn(new Error("CANNOT LIST INVOICES"));
    } else {
      /* TODO Add in page, per_page, pages, total attributes */
      xml.get("//invoices").childNodes().foreach(function(e, i, a) {
        var invoice = new Invoice();
        
        invoice._getXML(a.childNodes(), function() {
          invoices.push(invoice);
        });
      });
      
      fn(null, invoices);
    }
  });
};

Invoice.prototype.sendByEmail = function(fn) {
  /* TODO Impliment Custom email functionality*/
  var self = this;
  
  this._setXML("invoice.sendByEmail", function(xml) {
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT SEND EMAIL"));
      } else {
        fn(null, self);
      }
    });
  });
};

Invoice.prototype.sendBySnailMail = function(fn) {
  var self = this;
  
  this._setXML("invoice.sendBySnailMail", function(xml) {
    self.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT SEND SNAIL MAIL"));
      } else {
        fn(null, self);
      }
    });
  });
};

/*
Invoice.prototype.addLine = function(line, fn) {
  var self = this;
  
  self.lines.push(line);
  
  this._setXML("invoice.update", function(xml) {
    this.freshbooks.get(xml, function(err, xml) {
      if("ok" != xml.get("//response").attr("status").value() || err) {
        fn(new Error("CANNOT ADD LINE"));
      } else {
        
        fn(null, self);
      }
    });
  });
};

Line.prototype.update = function(fn) {
  
};

Line.prototype.delete = function(fn) {
  
};
*/

module.exports = Invoice;
