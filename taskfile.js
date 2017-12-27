'use strict';

// import eddited utilities
const buildTools = require('./build-tools.js');
const version = require('./package.json').version;
const $ = new buildTools(version);
const _ = { every: false }; // for inline plugins

// plugin wrappers
const save = function * (files) { return $.saveFile(files); };
const join = function * (files) { files = $.joinFiles(files); };
const vars = function * (files) { files = $.extractVars(files); };


// the build process
module.exports = {

  // Methods
  * builder (task) {
    yield task.source($._conf).run(_, vars);
    yield task.source($._theme).less($.less).target('./dist');
    yield task.source($._plugins).less($.less).run(_, save);
    yield task.source($._pretty).less().run(_, save);
  },

  * joiner (task) {
    yield task.source($._web).run(_, vars).target('./web');
    yield task.source($._out).run(_, join).target('./dist');
  },


  // CLI Commands (Entry Points)
  * build (task) { task.serial(['builder', 'joiner']); },
  * develop (task) {
    yield task.start('build');
    yield task.watch('src/**/*.less', 'build');
  }

}
