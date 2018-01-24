/*=== edditor scripts ===*/

// Start Vue
var start = new Vue({
  el: "#edditor",
  data: {
    color_accent: "#3d3d3d",
    color_background: "#ffffff",
    color_text: "#191a23",
    color_text_subtle: "#aaaaaa",
    color_shadow: "#f7f7f7",
    color_border: "#eaeaea",
    color_link: "#3d3d3d",
    color_button: "#3d3d3d",
    color_button_text: "#ffffff",
    color_upvote: "#f44336",
    color_downvote: "#0071c5",
    color_thumbnail: "#f1f1f1",
    color_nsfw: "#d86a62",
    color_locked: "#ead340",
    color_stickied: "#399b76",
    color_visited: "#aaaaaa",
    color_red_flair: "#d86a62",
    color_green_flair: "#399b76",
    width_sidebar: "300px",
    width_thumbnail: "70px",
    height_thumbnail: "50px",
    hover_delay: "1.5s",
    text_submit_link: "Show",
    text_submit_text: "Tell",
    text_subscribers: "Users",
    text_here_now: "Browsing",
    text_sub_prefix: "r/",
    enable_body_margin: true,
    width_body_margin: "25px",
    color_body_margin: "#5c6052",
    enable_header_box: true,
    header_box_height: "250px",
    header_box_bg_color: "#ffffff",
    header_box_text_color: "#ffffff",
    header_box_bg_image: true,
    header_box_bg_scroll: true,
    header_box_bg_scroll_hover: true,
    text_header_box: "r/eddited - clean. simple.",
    enable_tabmenu_dropdown: false,
    enable_sidebar_image: true,
    sidebar_image_height: "206px",
    enable_headline_box: true,
    headline_box_bg_color: "#3d3d3d",
    headline_box_text_color: "#ffffff",
    enable_split_submit_buttons: true,
    enable_nsfw_thumbnails: false,
    version: "1.0.0"
  },
  computed: {
    saveConfig: function() {
      let exported = {};
      for (var val in this._data) {
        if (val != "version") {
          exported[val] = this._data[val];
        }
      }
      return exported;
    },
    lessVars: function() {
      let exported = {};
      for (var lvar in this._data) {
        let varName = "@" + lvar.replace(/_/g, "-");
        let varData = this._data[lvar] + "";

        if (varName.indexOf('@text') > -1) varData = `"${varData}"`;
        exported[varName] = varData;
      }
      return exported;
    },
    css: function() {
      return {
        base: {
          color: this.color_text,
          backgroundColor: this.color_background
        },
        textSubtle: { color: this.color_text_subtle },
        accent: { color: this.color_accent },
        border: { border: '1px solid ' + this.color_border },
        shadow: { backgroundColor: this.color_shadow },
        thumbnail: { backgroundColor: this.color_thumbnail },
        locked: { color: this.color_locked },
        lockedBorder: { borderBottom: '2px solid ' + this.color_locked },
        upvote: { color: this.color_upvote },
        downvote: { color: this.color_downvote },
        stickied: { color: this.color_stickied },
        nsfw: { color: this.color_nsfw },
        redFlair: { backgroundColor: this.color_red_flair },
        greenFlair: { backgroundColor: this.color_green_flair },
        link: { color: this.color_link },
        visited: { color: this.color_visited },
        button: {
          color: this.color_button_text,
          backgroundColor: this.color_button
        },
        obutton: {
          color: this.color_button,
          border: '1px solid ' + this.color_button
        },
        headerBox: {
          height: this.header_box_height,
          lineHeight: this.header_box_height,
          color: this.header_box_text_color,
          backgroundColor: this.header_box_bg_color,
          backgroundImage: this.header_box_bg_image ? 'url("../dist/header.jpg")' : 'none'
        },
        headerBoxClass: {
          'col-12': 1, 'card': 1, 'hbox': 1,
          'animated': (this.header_box_bg_scroll && !this.header_box_bg_scroll_hover),
          'animated-hover': (this.header_box_bg_scroll && this.header_box_bg_scroll_hover)
        },
        headline: {
          color: this.headline_box_text_color,
          backgroundColor: this.headline_box_bg_color
        }
      }
    }
  },
  methods: {
    loadConfig: function() {
      let done = 0, total = -1,
          imported = $('#importcfg').val();
      if (!imported) return nay('Nothing to import!');
      try {
        var processing = JSON.parse(imported);
      } catch (e) {
        if (e.name == 'SyntaxError') return nay('Syntax Error!');
        else return nay(e.message);
      }

      for (var count in this._data) total += 1;

      // is array
      if (imported.charAt(0) == "[") {
        for (var ac = 0;ac < processing.length;ac++) {
          let varData = processing[ac].data;
          let varName = processing[ac].name.replace('@', '').replace(/-/g, "_");
          if (this.hasOwnProperty(varName)) {
            this[varName] = varData; done += 1;
          }
        }
      // else if is object
      } else if (imported.charAt(0) == "{") {
        for (var ao in processing) {
          if (this.hasOwnProperty(ao)) {
            this[ao] = processing[ao]; done += 1;
          }

        }
      } else {
        return nay("Unrecognized input.");
      }

      return yay(`Imported ${done} out of ${total} options.`);
    },
    loadDemo: function() {
      let demo = $('#loadDemo').val();
      if (demos.hasOwnProperty(demo)) {
        $('#importcfg').val(JSON.stringify(demos[demo]));
        this.loadConfig();
      } else {
        return nay("Not Sure what you're trying to do...");
      }
    },
    compileTheme: function() {
      let that = this;
      $('#compiledTheme').val('');

      loadFiles('pretty', function(less1) {
        let stage1 = buildLess(less1, start.lessVars, false, function(css1) {

          loadFiles('theme', function(less2) {
            let stage2 = buildLess(less2, start.lessVars, true, function(css2) {

              loadFiles('plugins', function(less3) {
                let stage3 = buildLess(less3, start.lessVars, true, function(css3) {

                  let template = [
                    `/* eddited options v${start.version} */`, css1,
                    `/* eddited core v${start.version} */`, css2,
                    `/* eddited plugins v${start.version} */`, css3
                  ];

                  $('#compiledTheme').val(template.join('\n\n'));
                  yay('Theme Compiled!');
                });
              });
            });
          });
        });
      });

    }
  }
});
