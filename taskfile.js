'use strict';

const fin = './dist/';
const src = './src/**/*.css';
const css = './src/theme.css';
const min = { suffix: '.min' };
const cln = {
  plugins: [
    require('postcss-csscomb')('zen')
  ]
};
const cfg = {
  to: fin,
  from: css,
  map: false,
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      features: {
        fontVariant: false
      }
    }),
    require('cssnano')
  ]
};

exports.default = function * (task) {
  yield task.start('build')
  yield task.watch(`${src}`, 'build')
};

exports.build = function * (task) {
  yield task.source(`${css}`).postcss(cfg).rename(min).target(`${fin}`);
};

exports.clean = function * (task) {
  yield task.source('./src/_structure.css').postcss(cln);
};
