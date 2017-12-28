// Start Vue
var start = new Vue({
  el: '#eddit',
  data: {
    toRestore: '',
    config: config,
    imports: null,
    compiled: '',
  },
  methods: {
    is: function(type, label) {
      if (typeof label === 'boolean') return false;
      return label.toLowerCase().indexOf(type) > - 1;
    },
    isColor: function(conf) {
      if (this.is('@color', conf.name)) return true;
      if (this.is('#', conf.data)) return true;
      return false;
    },
    isText: function(conf) {
      return this.is('@text', conf.name);
    },
    isPx: function(conf) {
      return this.is('px', conf.data);
    },
    isToggle: function(conf) {
      if (this.is('@enable', conf.name)) return true;
      if (typeof conf.data === 'boolean') return true;
      return false;
    },
    labelMaker: function(label) {
      return label.split('-').join(' ').replace('@', '');
    },
    restore: function() {
      if (!this.toRestore) return alert('Nothing to compile.');
      if (this.toRestore.charAt(0) != "[") return alert('Syntax Err 1');
      if (this.toRestore.charAt(this.toRestore.length - 1) != "]") return alert('Syntax Err 2');
      try {
        var processing = JSON.parse(this.toRestore);
      } catch (e) {
        if (e.name == 'SyntaxError') return alert('Syntax Error 3');
        else return alert(e.message);
      }

      this.config = processing;
      alert('Imported!');
    },
    loadFiles: function(callback) {
      if (!this.imports) {
        var _get = new XMLHttpRequest();
        _get.onreadystatechange = function () {
          if (this.readyState == 4) {
            this.imports = this.response;
            callback(this.response);
          }
        }
        _get.open("GET", '../src/build/web.less', true);
        _get.send();
      }
      else {
        return callback(this.imports);
      }
    },
    compile: function() {
      let that = this;
      let lessVars = {};
      that.compiled = '';
      for (var i = 0;i < config.length;i++) {
        var name = config[i].name;
        lessVars[name] = config[i].data.toString();
        if (this.is('@text', name)) lessVars[name] = `"${lessVars[name]}"`;
      }
      console.log(lessVars);
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
