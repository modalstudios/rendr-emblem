
# rendr-emblem v0.0.1 



## Getting Started

[Handlebars](http://handlebarsjs.com/) and [Emblem](http://emblemjs.com/) template adapter for [Rendr](https://github.com/airbnb/rendr) apps.



## Usage



### 1) Set the default templateAdapter to rendr-emblem

./app/app.js

```
    module.exports = BaseApp.extend({
        defaults: {
            templateAdapter: 'rendr-emblem'
        },
        
        ...
    });
```


### 2)  Create emblem files

Create .emblem files within your ./app/views.  You can intermix .hbs and .emblem within the same folder.  If the names are the same, the .emblem takes precedence.


### 3)  Add grunt task

- Install the grunt task
[grunt-emblem-handlebars](https://github.com/modalstudios/grunt-emblem-handlebars.git)


- Switch out your usual Rendr [handlebars] task with a slightly modified version.  This task will pre-compile both Handlebars and Emblem down to a single pre-compiled Handlebars.

- ```
   emblem: {
    compile: {
      options: {
        namespace: false,
        commonjs: true,
        processName: function(filename) {
          var r;
          r = /(apps\/app\/(templates|views)\/)/;
          return filename.replace(r, '').replace(/(.emblem|.hbs)/, '');
        }
      },
      files: {
        "tmp/compiledTemplates.js": ["apps/app/views/**/*.emblem", "apps/app/views/**/*.hbs"]
      },
      filter: function(filepath) {
        var filename;
        filename = path.basename(filepath);
        return filename.slice(0, 2) !== "__";
      }
    }
  }
```


