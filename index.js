var fs = require('fs'),
    matchers = require('./matchers');

function Engine(path) {
  this.path = path || 'templates';
}

Engine.prototype.getTemplatePath = function (templateName) {
  this.path + "/" +  templateName.replace(/\./g, '/') + '.html';
};

//TODO: Promisify this
Engine.prototype.replaceTemplate = function (html) {
  
  var self = this;
  
  return html.replace(matchers.template, function (match, group) {
    
    var data = fs.readFileSync(self.getTemplatePath(group), 'utf8');
    
    data = self.replaceTemplate(data);
    
    return data;
    
  });
  
  //TODO: Implement layouts
  
};

Engine.prototype.readTemplate = function (templateName) {
  
  var self = this;
  
  return new Promise(function (resolve, reject) {
    
    fs.readFile(self.getTemplatePath(templateName), 'utf8', function (err, data) {

      if (err) {
        return reject(err);
      }
      
      return resolve(self.replaceTemplate(data));
      
    });
    
  });
  
};

Engine.prototype.render = function(templateName) {
  return this.readTemplate(templateName);
};

module.exports = Engine;