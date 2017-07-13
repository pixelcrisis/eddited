'use strict';

let theme = {
  pretty: null,
  extras: null,
  version: require('./package.json').version
};

const plugins = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-conditionals'),
  require('postcss-cssnext')({ features: { fontVariant: false } }),
  require('cssnano')({ zindex: false })
];

const get = function (files) { return files[0].data.toString(); };
const getPretty = function * (file) { theme.pretty = get(file); };
const getExtras = function * (file) { theme.extras = get(file); };

module.exports = {

  * cleaner (task) {
    yield task.source('src/**/*.css')
          .postcss({ plugins: require('postcss-csscomb') }).target('src');
  },

  * formatter (task) {
    yield task.source('dist/theme.min.css')
          .format(theme).target('dist');
  },

  * builder (task) {
    yield task.source('src/theme.css')
          .postcss({ from: './src/theme.css', plugins: plugins })
          .rename({ suffix: '.min' }).target('dist');

    yield task.source('src/build/_pretty.css')
          .postcss({ from: './src/build/', plugins: plugins })
          .run({ every: false }, getPretty);

    yield task.source('src/build/_extras.css')
          .postcss({ from: './src/build/', plugins: plugins })
          .run({ every: false }, getExtras);
  },

  // CLI / npm script tools
  * build (task) { task.serial(['builder', 'formatter']) },
  * publish (task) { task.serial(['cleaner', 'build']) },
  * develop (task) { yield task.serial(['cleaner', 'build']);
    yield task.watch('src/**/*.css', 'build')
  }

};
