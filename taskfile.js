'use strict';

const plugins = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-conditionals'),
  require('postcss-cssnext')({ features: { fontVariant: false } }),
  require('cssnano')({ zindex: false })
];

let pretty;
const csscomb = [ require('postcss-csscomb') ];
const version = require('./package.json').version;
const extract = function * (file) { pretty = file[0].data.toString(); };

const format = function * (file) {
  let template = [
    `/* eddited v${version} */\n`, pretty,
    `\n/* core theme (upgrade below this line) */`, file[0].data.toString()
  ];
  file[0].data = new Buffer(template.join('\n'))
};

module.exports = {

  * cleaner (task) {
    yield task.source('src/**/*.css')
          .postcss({ plugins: csscomb }).target('src');
  },

  * formatter (task) {
    yield task.source('dist/theme.min.css')
          .run({ every: false }, format).target('dist');
  },

  * builder (task) {
    yield task.source('src/theme.css')
          .postcss({ from: './src/theme.css', plugins: plugins })
          .rename({ suffix: '.min' }).target('dist');

    yield task.source('src/base/_pretty.css')
          .postcss({ from: './src/base/', plugins: plugins })
          .run({ every: false }, extract);
  },

  // CLI / npm script tools
  * build (task) { task.serial(['builder', 'formatter']) },
  * publish (task) { task.serial(['cleaner', 'build']) },
  * develop (task) {
      yield task.start('cleaner');
      yield task.watch('src/**/*.css', 'build')
  }

};
