var fs = require('fs'),
    matchers = require('./matchers');

function Engine(path, verbose) {
  this.path = path || 'templates';
  this.verbose = verbose || false;
}

Engine.prototype.getTemplatePath = function (templateName) {
  return this.path + "/" +  templateName + '.html';
};

//TODO: Promisify this
Engine.prototype.replaceTemplate = function (html) {
  
  var self = this;
  
  return html.replace(matchers.template, function (match, group) {
    
    var data = fs.readFileSync(self.getTemplatePath(group), 'utf8');
    
    data = self.replaceTemplate(data);
    
    if (self.verbose) {
      data = '<!-- BEGIN ' + group + '.html -->' + data + '<!-- END ' + group +  '.html -->';
    }

    return data;
    
  });
    
};

Engine.prototype.replaceContainer = function (html) {
  
  var self = this;
  
  var match = html.match(matchers.container);
  
  if (!match) {
    return html;
  }
  
  var containerSrc = match[1];
  
  var content = match[2];
  
  var container = fs.readFileSync(self.getTemplatePath(containerSrc), 'utf8');
  
  if (self.verbose) {
    content = '<!-- BEGIN content -->' + content + '<!-- END content -->';
  }
  
  return container.replace(matchers.content, content);
  
};

Engine.prototype.replaceData = function (html, data) {
  
  return html.replace(matchers.data, function (match, group) {
    
    var path = group.split('.'),
        current = data;
        
    try {
      
      path.forEach(function (it) {
        current = current[it];
      });
    
    } catch (e) {
      return "";
    }
    
    return current;
    
  });
  
};

Engine.prototype.readTemplate = function (templateName, data) {
  
  var self = this;
  
  return new Promise(function (resolve, reject) {
    
    fs.readFile(self.getTemplatePath(templateName), 'utf8', function (err, html) {

      if (err) {
        return reject(err);
      }
      
      return resolve(self.replaceData(self.replaceTemplate(self.replaceContainer(html)), data));
      
    });
    
  });
  
};

Engine.prototype.render = function(templateName, data) {
  return this.readTemplate(templateName, data);
};

module.exports = Engine;