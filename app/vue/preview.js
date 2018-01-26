/*=== edditor templates: sidebar ===*/

Vue.component('preview', {
  props: ['css'],
  template: `<div class="card ed-preview" :style="css.base">
    <div class="card-header">Live Preview</div>
    <div>General Text Color</div>
    <div :style="css.textSubtle">Lighter, Subtle Text</div>
    <div :style="css.link" class="mb-2">Link & Submission Text</div>
    <div :style="css.border" class="box">Border</div>
    <div :style="css.shadow" class="box">Shadow</div>
    <hr />
    <div :style="css.thumbnail" class="box sq">Thumbnail</div>
    <div :style="css.lockedBorder" class="mb-2">
      <span :style="css.locked">■</span> Locked
    </div>
    <div :style="css.upvote">▲ Upvote</div>
    <div :style="css.downvote">▼ Downvote</div>
    <div class="row mt-2">
      <div class="col-6 col-lg-12 col-xl-6">
        <span :style="css.redFlair" class="badge">Red Flair</span>
      </div>
      <div class="col-6 col-lg-12 col-xl-6">
        <strong :style="css.stickied">Stickied</strong>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-6 col-lg-12 col-xl-6">
        <span :style="css.greenFlair" class="badge">Green</span>
      </div>
      <div class="col-6 col-lg-12 col-xl-6">
        <span :style="css.nsfw">NSFW</span>
      </div>
    </div>
    <hr />
    <div :style="css.link">A Sample Link</div>
    <div :style="css.visited">A Sample Visited Link</div>
    <div :style="css.button" class="box mt-2">A Sample Button</div>
    <div :style="css.obutton" class="box">A Sample Button</div>
  </div>`
});
