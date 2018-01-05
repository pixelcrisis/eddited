/*=== eddited web compiler ===*/

// Utility Functions
const updateConfig = function(val) { this.$emit('input', val); };

const lessVars = function() {
  let exported = {};
  for (var lvar in this._data) {
    let varName = "@" + lvar.replace(/_/g, "-");
    let varData = this._data[lvar] + "";

    if (varName.indexOf('text') > -1) varData = `"${varData}"`;
    exported[varName] = varData;
  }
  return exported;
}

// File loader function
const loadFiles = function(file, callback) {
  var loader = new XMLHttpRequest();
  loader.onreadystatechange = function() {
    if (this.readyState == 4) callback(this.response);
  };
  loader.open('GET', '../app/less/' + file + '.less', true);
  loader.send();
};

// Build Less Function
const buildLess = function(file, vars, clean, callback) {
  less.render(file, { modifyVars: vars, relativeUrls: true }, function(e,o) {
    if (e) return console.log(e);
    if (clean) {
      new CleanCSS().minify(o.css, function(err, out) {
        if (!err) callback(out.styles);
        else console.log(err);
      })
    }
  });
};

const importConfig = function() {
  let imported = $('#importcfg').val();
  if (!imported) return alert('Nothing to import!');
  try {
    var processing = JSON.parse(imported);
  } catch (e) {
    if (e.name == 'SyntaxError') return alert('Syntax Error!');
    else return alert(e.message);
  }

  // is array
  if (imported.charAt(0) == "[") {
    for (var ac = 0;ac < processing.length;ac++) {
      let varData = processing[ac].data;
      let varName = processing[ac].name.replace('@', '').replace(/-/g, "_");
      if (!this.hasOwnProperty(varName)) return alert("Unrecognized: " + varName);
      this[varName] = varData;
    }
  // else if is object
  } else if (imported.charAt(0) == "{") {
    for (var ao in processing) {
      if (!this.hasOwnProperty(ao)) return alert("Unrecognized: " + ao);
      this[ao] = processing[ao];
    }
  } else {
    return alert("Unrecognized input.");
  }

  return alert("Imported!");
};

const exportConfig = function() {
  let exported = {};
  for (var val in this._data) {
    if (val != "version") {
      exported[val] = this._data[val];
    }
  }
  return exported;
};


const compileTheme = function() {
  let theme = '', that = this;
  $('#compiledTheme').val('');

  loadFiles('web', function(imports) {
    let built = buildLess(imports, start.lessVars, true, function(css) {
      $('#compiledTheme').val(css);
    });
  })

};
