#Templ8
This is a simple templating library for NodeJS
It's made of the following items:

* Templates
* Containers/Content
* Data

This library will basically replace template nodes by the specified source and will insert content into containers in the same way

##Example

###templates/index.html
```
<html>
  <template src="head"/>
  <body>
    <h1>Templ8</h1>
    <p>A pretty simple templating engine</p>
    <template src="navigation"/>
    <p>This is a container called index</p>
    <content>
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
<div>
  Here's an example on how to pass data
  <template src="someOtherCode"/>
  <p>See it in action:</p>
  <p>Hello! my name is {{user.name}}!</p>
</div>
```

###templates/someOtherCode.html
```
<pre>
  engine.render('index', {
    "user": {
      "name": "Sean"
    }
  });
</pre>
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
    engine = require("templ8");

const PORT = 4000;

engine = new engine();

//Add HTML comments to show where templates begin and end
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
```

##Todos
* Use promises in file reading operations
* Implement as an Express rendering engine