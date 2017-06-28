'use strict';

const fin = './dist/';
const src = './src/**/*.css';
const css = './src/theme.css';
const min = { suffix: '.min' };
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

exports.default = function * (fly) {
  yield fly.start('build')
  yield fly.watch(`${src}`, 'build')
};

exports.build = function * (fly) {
  yield fly.source(`${css}`).postcss(cfg).rename(min).target(`${fin}`);
};
