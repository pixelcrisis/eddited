/*=== edditor templates: content ===*/

// Helper Navs
Vue.component('helper-navs', {
  template: `<div class="helper-nav">
    <div>
      <a href="#step0" class="step-link active">Welcome</a>
      <a href="#step1" class="step-link">Color Scheme</a>
      <a href="#step2" class="step-link">Header</a>
      <a href="#step3" class="step-link">Content</a>
      <a href="#step4" class="step-link">Sidebar</a>
      <a href="#step5" class="step-link">Compile</a>
    </div>
    <div>
      <a href="#" class="misc-link" id="collapseAll">Collapse All</a>
      <a href="#" class="misc-link" id="expandAll">Expand All</a>
    </div>
    <div>
      <a class="misc-link" href="#saveDialog" data-toggle="modal">Save</a>
      <a class="misc-link" href="#loadDialog" data-toggle="modal">Load</a>
    </div>
  </div>`
});

// Section Layout
Vue.component('step', {
  props: ['title', 'num', 'show'],
  template: `<div class="step" :id="'step' + num">
    <h3 :class="{ collapsed: !show }" data-toggle="collapse" :data-target="'#Card' + num">
      {{ title }}
    </h3>
    <hr />
    <div :class="{ collapse: 1, show: show }" :id="'Card' + num">
      <slot></slot>
    </div>
  </div>`
});

// Compile Template
Vue.component('compiled', {
  methods: { updateConfig },
  template: `<div class="import">
    <textarea id="compiledTheme" rows="5" class="form-control"></textarea>
    <button class="btn btn-dark mt-3" @click="updateConfig()">Compile</button>
  </div>`
})
