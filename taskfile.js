'use strict';

const $ = {
  v: require('./package.json').version,
  cssnano: require('cssnano'),
  import: require('postcss-import'),
  csscomb: require('postcss-csscomb')('zen'),
  cssnext: require('postcss-cssnext')({ features: { fontVariant: false } })
};

const cfg = {
  clean: { plugins: [ $.csscomb ] },
  build: {
    to: './dist/', from: './src/theme.css',
    plugins: [ $.import, $.cssnext, $.cssnano ]
  },
  rename: { suffix: '.min' }
};

exports.default = function * (task) {
  yield task.serial(['clean', 'build'])
  yield task.watch('src/**/*.css', 'build')
};

exports.build = function * (task) {
  yield task.source('src/theme.css')
    .postcss(cfg.build)
    .rename(cfg.rename)
    .run({ every: false },
      function * (file) {
        let data = file[0].data.toString();
        let contents = `/* v${$.v} */ \n${data}`;
        file[0].data = new Buffer(contents);
      })
    .target('dist');
};

exports.clean = function * (task) {
  yield task.source('src/**/!(_root).css')
    .postcss(cfg.clean)
    .target('src');
};
