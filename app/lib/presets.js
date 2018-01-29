/*=== edditor presets ===*/

// Define Presets
const presets = {

  "default": {
    "color_background": "#ffffff",
    "color_text": "#191a23",
    "color_submenu": "#3d3d3d",
    "color_submenu_text": "#ffffff",
    "color_link": "#3d3d3d",
    "color_button": "#3d3d3d",
    "color_button_text": "#ffffff",
    "color_upvote": "#f44336",
    "color_downvote": "#0071c5",
    "color_thumbnail": "#f1f1f1",
    "color_nsfw": "#d86a62",
    "color_locked": "#ead340",
    "color_stickied": "#399b76",
    "color_visited": "#aaaaaa",
    "color_red_flair": "#d86a62",
    "color_green_flair": "#399b76",
    "width_sidebar": "300px",
    "width_thumbnail": "80px",
    "height_thumbnail": "60px",
    "text_submit_link": "Show",
    "text_submit_text": "Tell",
    "text_subscribers": "Users",
    "text_here_now": "Browsing",
    "text_sub_prefix": "r/",
    "enable_body_margin": false,
    "width_body_margin": "25px",
    "color_body_margin": "#bfbfbf",
    "enable_header_box": true,
    "header_box_height": "250px",
    "header_box_bg_color": "#ffffff",
    "header_box_text_color": "#ffffff",
    "header_box_bg_image": true,
    "header_box_bg_scroll": false,
    "header_box_bg_scroll_hover": true,
    "text_header_box": "r/eddited - clean. simple.",
    "enable_tabmenu_dropdown": false,
    "enable_sidebar_image": true,
    "sidebar_image_height": "206px",
    "enable_headline_box": true,
    "headline_box_bg_color": "#3d3d3d",
    "headline_box_text_color": "#ffffff",
    "enable_split_submit_buttons": true,
    "enable_nsfw_thumbnails": false,
  },

  "noplugins": {
    "enable_body_margin": false,
    "enable_header_box": false,
    "header_box_bg_image": true,
    "enable_tabmenu_dropdown": false,
    "enable_sidebar_image": false,
    "enable_headline_box": false,
    "enable_split_submit_buttons": false,
    "enable_nsfw_thumbnails": false
  },

  "red": {
    "color_submenu": "#c63e4e",
    "color_link": "#c63e4e",
    "color_button": "#c63e4e",
    "color_nsfw": "#c63e4e",
    "color_red_flair": "#c63e4e",
    "headline_box_bg_color": "#c63e4e",
    "color_body_margin": "#bfbfbf",
  },

  "green": {
    "color_submenu": "#299a29",
    "color_link": "#299a29",
    "color_button": "#299a29",
    "color_stickied": "#299a29",
    "color_green_flair": "#299a29",
    "headline_box_bg_color": "#299a29",
    "color_body_margin": "#bfbfbf",
  },

  "blue": {
    "color_submenu": "#0071c5",
    "color_link": "#0071c5",
    "color_button": "#0071c5",
    "headline_box_bg_color": "#0071c5",
  }

};

// Define Updated
const updateCfg = function() {
  let updating = $('#loadPreset select').val();
  if (presets.hasOwnProperty(updating)) {
    $('#import').val(JSON.stringify(presets[updating]));
    this.imported();
    showPage('colors');
  }
};

Vue.component('preset-loader', {
  methods: { updateConfig },
  template: `<span class="input-group" id="loadPreset">
    <select class="custom-select input-sm">
      <option selected>Load Preset</option>
      <option value="default">Default</option>
      <option value="noplugins">No Plugins</option>
      <option value="red">Red Demo</option>
      <option value="green">Green Demo</option>
    </select>
    <span class="input-group-append">
      <button class="btn btn-info btn-sm" type="button" @click="updateConfig()">Load</button>
    </span>
  </span>`
});
