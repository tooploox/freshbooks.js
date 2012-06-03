#Freshbooks.js

Freshbooks.js is a node.js module providing a wrapper to the 
[FreshBooks](http://www.freshbooks.com) API.

**Note:** This project is very much a *WORK IN PROGRESS*. So far I've 
implimented the majority of the Invoice API and am tidying up the code before 
launching into the other APIs. I've also decided
to take some liberties on some aspects of the API, ie replacing 
invoice.lines.add/delete/update methods with Array.pop/push, as frankly there 
are better ways to interact with the API in JS than is currently implimented.

## Installation

    $ npm install freshbooks
    
Note: This module utilises [libxmljs](https://github.com/polotek/libxmljs). You 
will need have the **libxml2** library installed and also the **libxml2-devel** 
(**libxml2-dev** on debian systems) package. This comes with the `xml2-config`
utility that is needed for compiling.  **This command must be in your path.**

## Example

    require("freshbooks");
    
    var freshbooks = new FreshBooks("https://freshbooksjs.freshbooks.com/api/2.1/xml-in","59dbd7310470641ff2332bd016ac2e4e");
    var invoice = freshbooks.Invoice();

    invoice.get(4368, function(err, invoice) {
      if(err) {
        console.log(err);
      } else {
        console.log(invoice.invoice_id);
      }
    });

## License

(The MIT License)

Copyright (c) 2012 Marc Loney &lt;marc@metacrash.com.au&gt;

Permission is hereby granted, free of charge, to any person obtaininga copy of 
this software and associated documentation files (the 'Software'), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.