#Templ8
This is a simple templating library

##Example

###templates/index.html
```
<html>
  <template src="head"/>
  <body>
    <template src="navigation"/>
    <h1>Hello! This is test</h1>
    <p>Hi, this is me testing my new templating engine</p>
    <p>It's just serves static HTML in a simple way</p>
    <template src="example"/>
    <template src="footer"/>
  </body>
</html>
```

###templates/head.html
```
<meta charset="utf8">
<title>Templating engine test</title>
```

###templates/navigation.html
```
<nav>
  <a href="">Home</a>
  <a href="">Link1</a>
  <a href="">Link2</a>
</nav>
```

###templates/example.html
```
<pre>
  Here's an example code
  <template src="someOtherCode"/>
</pre>
```

###templates/someOtherCode.html
```
var a = 100;
```

###templates/footer.html
```
<div>
  This is the footer
</div>
```

###Using express
```
var express = require("express"),
    app = express(),
    templ8 = require("templ8");

var engine = new templ8("templates");

app.get("/", function (req, res) {
  
  engine.render('index').then(function (html) {
    res.setHeader('content-type', 'text/html');
    res.status(200).end(html);
  }).catch(function (err) {
    res.status(500).end(err);
  });
  
});

app.listen(4000, function () {
  console.log("App running");
});
```

##Todos
* Use promises in file reading operations
* Implement layouts
* Implement as an Express rendering engine