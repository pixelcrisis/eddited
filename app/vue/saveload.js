/*=== edditor templates: import and export ===*/

// Export Template
Vue.component('export', {
  props: ['config'],
  methods: { highlight: function(el) { el.focus(); el.select(); } },
  template: `<div class="export" @click="highlight($event.target)">
    <textarea class="form-control" rows="5" readonly>{{ config }}</textarea>
    <p><small class="text-muted font-italic">
      Keep this in a text file somewhere.
    </small></p>
  </div>`
});

// Import Template
Vue.component('import', {
  methods: { updateConfig },
  template: `<div class="import">
    <textarea id="importcfg" rows="5" class="form-control"></textarea>
    <p><small class="text-muted font-italic">
      Paste your text file contents here.
    </small></p>
    <button class="btn btn-dark" @click="loadConfig()">Load</button>
    or
    <slot></slot>
  </div>`
});

// Demo Loader Template
Vue.component('load-demo', {
  props: ['name', 'value'],
  methods: { updateConfig },
  template: `<span class="demos">
    <span class="input-group">
      <select class="custom-select" id="loadDemo">
        <option selected>Choose a demo...</option>
        <option value="default">Default</option>
        <option value="noplugins">No Plugins</option>
        <option value="red">Red Demo</option>
        <option value="green">Green Demo</option>
      </select>
      <span class="input-group-append">
        <button class="btn btn-dark" type="button"
          @click="updateConfig()">Load Demo</button>
      </span>
    </span>
  </span>`
});
