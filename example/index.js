var express = require("express"),
    app = express(),
    engine = require("../index");

const PORT = 4000;

engine = new engine();

//if verbose is true, engine will add name of the template at the beggining and end of the html
engine.verbose = true;

app.get("/", function (req, res) {
  
   engine.render('body', {
    "user": {
      "name": "Sean"
    }
  }).then(function (html) {
    res.setHeader('content-type', 'text/html');
    res.status(200).end(html);
  }).catch(function (err) {
    res.status(500).end(err);
  });
  
});

app.listen(PORT, function () {
  console.log('Example listening at', PORT);
});