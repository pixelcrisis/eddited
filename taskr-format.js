module.exports = function (task, utils) {
  task.plugin({
    name: 'format',
    every: false,
    * func (files, opts) {

      let core = files[0].data.toString();
      let cfg = opts.pretty.split('{').join(' {\n  ').split('}').join('\n}');

      let template = [
        `/* eddited options */`, cfg,
        `/* eddited extras */`, opts.extras,
        `/* eddited core v${opts.version} */`, core
      ];

      files[0].data = new Buffer(template.join('\n\n'))

    }
  });
};
