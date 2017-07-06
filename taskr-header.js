'use strict';

module.exports = {
  name: 'header',
  * func(file, opts) {
    // okay, so this is horrible, but you get the idea.
    file.data = new Buffer(`/* ${opts} */ \n${file.data.toString()}`);
  }
}
