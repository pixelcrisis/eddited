/*=== edditor utility ===*/

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
    } else {
      // split out at first comment
      if (o.css && o.css.indexOf('.titlebox') > -1) {
        let styles = o.css.split('.titlebox');
        callback(".titlebox" + styles[1]);
      } else {
        let styles = o.css.split('.submit-text');
        callback(".submit-text" + styles[1]);
      }
    }
  });
};

// Vue config updater
const updateConfig = function(val) { this.$emit('input', val); };

// Success Message
const yay = function(msg) {
  $(".alert-success").text(msg).fadeTo(3000, 500).slideUp(500, function(){
    $(".alert-success").slideUp(500);
  });
};

// Error Message
const nay = function(msg) {
  $(".alert-danger").text(msg).fadeTo(3000, 500).slideUp(500, function(){
    $(".alert-danger").slideUp(500);
  });
};

// UX Interactions
$(document).ready(function(){

  $('#collapseAll').click(function() { $('.step .collapse').collapse('hide'); });
  $('#expandAll').click(function() { $('.step .collapse').collapse('show'); });

})
