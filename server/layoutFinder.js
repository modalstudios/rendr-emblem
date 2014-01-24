var fs = require('fs');
var path = require('path');
var Emblem = require('emblem');

module.exports = function(Handlebars) {

  return {
    getLayout: function(name, entryPath, callback) {

      // Check if an emblem version exists, if so use it, otherwise fallback to .hbs
      var layoutExt = 'emblem';

      var getLayoutFile = function(ext) {
        return path.join(entryPath, 'app/templates/', name + '.' + ext);
      }

      var layoutFile = getLayoutFile('emblem');
      if (!fs.existsSync(layoutFile)) {

        layoutExt = 'hbs';
        layoutFile = getLayoutFile(layoutExt);
        if (!fs.existsSync(layoutFile)) {
          throw new Error("rendr-emblem - Couldn't find template: [" + layoutFile + " or .emblem]");
        }
      }

      // compile emblem to pre-compiled handlebars
      fs.readFile(layoutFile, 'utf8', function (err, source) {
        if (err) return callback(err);
        var template;

        // Compile a handlebars compliant template
        if (layoutExt == 'emblem') {
          template = Emblem.compile(Handlebars, source);
        } else {
          template = Handlebars.compile(source);
        }

        callback(null, template);
      });
    }
  }
};
