/*=== eddited web compiler ===*/

// contains
String.prototype.is = function(string) { return this.indexOf(string) > -1; };
var str = function(str) { return String.prototype.toString(str); };

// Start Vue
var start = new Vue({
  el: '#eddit',

  data: {
    toload: '',
    imported: '',
    compiled: '',
    config: config
  },

  methods: {
    is: function(type, data) {
      let name = data.name;
      let value = data.data + "";
      if (type == "size") return (value.is('px'));
      else if (type == "text") return (name.is('@text'));
      else if (type == "color") return (name.is('@color') || value.is('#'));
      else if (type == "toggle") {
        return (name.is('@enabled') || value.is('true') || value.is('false'));
      }
    },

    label: function(str) { return str.split('-').join(' ').replace('@', ''); },

    restore: function() {
      if (!this.imported) return alert('Nothing to compile!');
      try {
        var processing = JSON.parse(this.imported);
      } catch (e) {
        if (e.name == 'SyntaxError') return alert('Syntax Error!');
        else return alert(e.message);
      }

      for (var d = 0; d < processing.length; d++) {
        var _new = processing[d];
        for (var c = 0; c < this.config.length; c++) {
          var _old = this.config[c];

          if (_new.name == _old.name) {
            _old.data = _new.data;
            console.log(`Imported ${_old.name}.`);
          }
        }
      }

      alert('Imported!');
    },

    loadFiles: function(cb) {
      if (this.toload) return cb(this.toload);
      var _get = new XMLHttpRequest();
      _get.onreadystatechange = function() {
        if (this.readyState == 4) {
          this.toload = this.response;
          cb(this.response);
        }
      };
      _get.open("GET", "../src/build/web.less", true);
      _get.send();
    },

    compile: function() {
      let that = this;
      let lessVars = {};
      that.compiled = '';

      for (var i = 0;i < this.config.length;i++) {
        var name = this.config[i].name;
        lessVars[name] = this.config[i].data + "";
        if (this.is('text', this.config[i])) lessVars[name] = `"${lessVars[name]}"`;
      }

      this.loadFiles(function(imports){
        less.render(imports, { modifyVars: lessVars, relativeUrls: true }, function(e,o) {
          if (e) return console.log(e);
          new CleanCSS().minify(o.css, function (err, out) {
            if (!err) that.compiled = out.styles;
            else console.log(err);
          });
        })
      });
    }
  }
});
