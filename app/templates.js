/*=== eddited web compiler templates ===*/

// Collapisble Card Template
Vue.component('card', {
  props: ['tag', 'label', 'title', 'subtitle', 'shown'],
  template: `<div class="card">
    <div class="card-body">
      <h5 class="card-title" data-toggle="collapse" :data-target="'#' + tag" v-if="title">
        {{ title }}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted" v-if="subtitle">{{ subtitle }}</h6>
      <div :class="{ collapse: 1, show: shown}" :id="tag">
        <div class="row align-items-center">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>`
});

// Demo Loader Template
Vue.component('demos', {
  props: ['name', 'value'],
  methods: { updateConfig },
  template: `<div class="demos col-lg-12">
    <div class="input-group">
      <select class="form-control custom-select" id="loadDemo">
        <option selected>Choose a demo...</option>
        <option value="default">Default</option>
      </select>
      <div class="input-group-append">
        <button class="btn btn-primary-secondary" type="button"
          @click="updateConfig()">
          Load Demo
        </button>
      </div>
    </div>
  </div>`
});

// Export Template
Vue.component('export', {
  props: ['config'],
  methods: {
    highlight: function(el) { el.focus(); el.select(); }
  },
  template: `<div class="export col-lg-12" @click="highlight($event.target)">
    <textarea class="form-control" rows="5" readonly>{{ config }}</textarea>
    <div class="font-italic">Save this text box locally.</div>
  </div>`
});

// Import Template
Vue.component('import', {
  methods: { updateConfig },
  template: `<div class="import col-lg-12">
    <textarea id="importcfg" rows="5" class="form-control"></textarea>
    <button class="btn btn-dark" @click="updateConfig()">Import</button>
    <div class="font-italic">Paste contents of your backup file.</div>
  </div>`
})

// Compile Template
Vue.component('compiled', {
  methods: { updateConfig },
  template: `<div class="import col-lg-12">
    <textarea id="compiledTheme" rows="5" class="form-control"></textarea>
    <button class="btn btn-dark" @click="updateConfig()">Compile</button>
  </div>`
})

// Setting Templates

Vue.component('color', {
  props: ['name', 'value'],
  methods: { updateConfig },
  template: `<div class="conf color col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control"
        :value="value" @input="updateConfig($event.target.value)">
      <span class="input-group-addon">
        <input type="color"
          :value="value" @change="updateConfig($event.target.value)">
      </span>
    </div>
    <label class="text-muted text-uppercase">
      {{ name }}
    </label>
  </div>`
});

Vue.component('string', {
  props: ['name', 'value'],
  methods: { updateConfig },
  template: `<div class="conf string col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control"
        :value="value" @input="updateConfig($event.target.value)">
    </div>
    <label class="text-muted text-uppercase">
      {{ name }}
    </label>
  </div>`
});

Vue.component('toggle', {
  props: ['name', 'value'],
  methods: { updateConfig },
  template: `<div class="conf toggle input-group col-lg-12">
    <span class="input-group-addon">
      <input type="checkbox"
        :checked="value" @change="updateConfig($event.target.checked)">
    </span>
    <span class="input-group-addon">{{ name }}</span>
  </div>`
});
