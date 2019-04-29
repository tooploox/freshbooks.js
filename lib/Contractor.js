// contractor
var libxml = require("libxmljs");

/**
 * Creates a new Contractor.
 *
 * @param {FreshBooks} FreshBooks
 * @return {Contractor}
 * @api public
 */

var Contractor = (module.exports = function() {
  (this.links = []), (this.credits = []);
});

/**
 * Constructs XML requests for the API depending on method.
 *
 * @param {String} method
 * @param {Array} options (optional)
 * @param {Function} fn
 * @api private
 */

Contractor.prototype._setXML = function(method, fn) {
  var xml = new libxml.Document(),
    request = xml.node("request").attr("method", method),
    options,
    self = this;

  //If second argument not a function then we have been passed the 'options' for contractor.list
  if ("function" == typeof arguments[2]) {
    options = arguments[1];
    fn = arguments[2];
  }

  switch (method) {
    case "contractor.create":
    case "contractor.update":
      var contractor = request.node("contractor");
      for (var key in this) {
        if ("function" !== typeof this[key]) {
          switch (key) {
            //Catch resulting values that can't be created/updated.
            case "freshbooks":
            case "credit":
            case "credits":
            case "url":
            case "auth_url":
            case "links":
            case "updated":
            case "folder":
            case "notifications": //Mismatch between API and Documentation
            case "contacts": //Mismatch between API and Documentation
              break;

            default:
              contractor.node(key).text(this[key]);
              break;
          }
        }
      }
      break;

    case "contractor.get":
    case "contractor.delete":
      request.node("contractor_id").text(self.contractor_id);
      break;

    case "contractor.list":
      if (null !== options) {
        for (var key in options) {
          if ("function" !== typeof options[key]) {
            request.node(key).text(options[key]);
          }
        }
      }
      break;
  }

  fn(xml);
};

/**
 * Sets Contractor properties from results of XML request.
 *
 * @param {Document} xml
 * @param {Function} fn
 * @api private
 */

Contractor.prototype._getXML = function(xml, fn) {
  var self = this,
    nodes = xml.get("//xmlns:contractor", this.freshbooks.ns).childNodes();

  for (var x = 0; x < nodes.length; x++) {
    if ("text" !== nodes[x].name()) {
      switch (nodes[x].name()) {
        case "notifications": //Mismatch between API and Documentation
        case "contacts": //Mismatch between API and Documentation
          break;

        case "links":
          (this.links.contractor_view = xml
            .get("//xmlns:contractor_view", this.freshbooks.ns)
            .text()),
            (this.links.view = xml
              .get("//xmlns:view", this.freshbooks.ns)
              .text()),
            (this.links.statement = xml
              .get("//xmlns:statement", this.freshbooks.ns)
              .text());
          break;

        case "credits":
          //Technically currency is an attribute not a name but haven't worked out a better way of handling this quite yet
          nodes[x].childNodes().forEach(function(a) {
            if ("text" !== a.name()) {
              self.credits[a.attr("currency").value()] = a.text();
            }
          });
          break;

        default:
          this[nodes[x].name()] = nodes[x].text();
          break;
      }
    }
  }
  fn();
};

/**
 * List Contractors.
 *
 * @param {Array} options (optional)
 * @param {Function} fn
 * @api public
 */

Contractor.prototype.list = function(fn) {
  var self = this;
  var options = {};
  console.log({ arguments });
  if ("function" === typeof arguments[1]) {
    options = arguments[0];
    fn = arguments[1];
  }

  this._setXML("contractor.list", options, function(xml) {
    self.freshbooks._get(xml, function(err, xml) {
      if (err) {
        fn(err);
      } else if (
        "ok" !=
        xml
          .get("//xmlns:response", self.freshbooks.ns)
          .attr("status")
          .value()
      ) {
        err = xml.get("//xmlns:error", self.freshbooks.ns).text();
        fn(new Error("CANNOT LIST contractors: " + err));
      } else {
        var contractors = xml.get("//xmlns:contractors", self.freshbooks.ns),
          contractors = [];

        xml.find("//xmlns:contractor", self.freshbooks.ns).forEach(function(a) {
          var contractor = new self.freshbooks.Contractor();
          xml = libxml.parseXmlString(
            '<?xml version="1.0" encoding="UTF-8"?>' +
              '<response xmlns="http://www.freshbooks.com/api/" status="ok">' +
              a.toString() +
              "</response>"
          );
          contractor._getXML(xml, function() {
            contractors.push(contractor);
          });
        });

        fn(null, contractors, {
          page: contractors.attr("page").value(),
          per_page: contractors.attr("per_page").value(),
          pages: contractors.attr("pages").value(),
          total: contractors.attr("total").value()
        });
      }
    });
  });
};
