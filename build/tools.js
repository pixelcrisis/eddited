/* eddited build process
   this file will build the theme for you! */

// import LESS plugins
const decomment = require('decomment');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessToJS = require('less-vars-to-js');

// contains
String.prototype.is = function(string) { return this.indexOf(string) > -1; };

// define buildTools function
const buildTools = function(version) {
  this.build.ver = version;
};

// buildTools library
buildTools.prototype = {

  // files to build
  _theme: './build/theme.less',
  _plugins: './build/plugins.less',
  _pretty: './build/pretty.less',
  _conf: './src/config.less',
  _out: './dist/theme.css',
  _web: './app/config.js',

  // define build data object
  build: {},
  config: [],

  // less plugin definition
  less: { plugins: [ new LessPluginCleanCSS() ] },


  // strip comments from string
  stripComments: decomment,

  // save compiled code to object
  saveFile: function (file) {
    let name = file[0].base.replace('.css', '');
    let data = file[0].data.toString();
    if (name == "pretty") data = this.stripComments(data);
    this.build[name] = data;
  },

  // format the outputted data into a single file
  joinFiles: function (file) {
    let core = file[0].data.toString();

    // define template for finale file
    let template = [
      `/* eddited options */`, this.build.pretty,
      `/* eddited plugins */`, this.build.plugins,
      `/* eddited core v${this.build.ver} */`, core
    ];

    // join template with new lines
    file[0].data = new Buffer(template.join('\n\n'));

    // export files
    return file;
  },

  // extract variables to JS file
  extractVars: function (file) {
    let name = file[0].base;
    let data = file[0].data.toString();

    // if less, get and organize the variables
    if (name.is('.less')) {
      this.config = ['var start = new Vue({'];
      this.config.push('  el: "#edditor",');
      this.config.push('  data: {');

      let extracted = LessToJS(data);

      for (var ex in extracted) {
        let exName = ex;
        let exData = extracted[ex];

        // if data is variable, get data
        while (exData.is('@')) exData = extracted[exData];

        // wrap raw data in quotes
        if (exName.is('width')) exData = `"${exData}"`;
        if (exName.is('color')) exData = `"${exData}"`;
        if (exName.is('delay')) exData = `"${exData}"`;
        if (exName.is('height')) exData = `"${exData}"`;

        exName = exName.replace('@', '');
        exName = exName.replace(/-/g, '_');

        this.config.push(`    ${exName}: ${exData},`);
      }

      // version
      this.config.push(`    version: "${this.build.ver}"`);
      this.config.push('  },');
      this.config.push('  computed: { exportConfig, lessVars },');
      this.config.push('  methods: { importConfig, compileTheme },');
      this.config.push('});');

    } else {
      // else export variables to file data
      file[0].data = new Buffer(this.config.join('\n'));
    }

    return file;
  }

};

// export utilities
module.exports = buildTools;
