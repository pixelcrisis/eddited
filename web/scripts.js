// Start Vue
var start = new Vue({
  el: '#eddit',
  data: {
    config: config
  },
  methods: {
    is: function(type, label) {
      if (typeof label === 'boolean') return false;
      return label.toLowerCase().indexOf(type) > - 1;
    },
    isColor: function(conf) {
      if (this.is('@color', conf.name)) return true;
      if (this.is('#', conf.data)) return true;
      return false;
    },
    isText: function(conf) {
      return this.is('@text', conf.name);
    },
    isPx: function(conf) {
      return this.is('px', conf.data);
    },
    isToggle: function(conf) {
      if (this.is('@enable', conf.name)) return true;
      if (typeof conf.data === 'boolean') return true;
      return false;
    },
    labelMaker: function(label) {
      return label.split('-').join(' ').replace('@', '');
    }
  }
});
