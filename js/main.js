// @codekit-prepend quiet "../node_modules/masonry-layout/dist/masonry.pkgd.min.js";
// @codekit-prepend quiet "../node_modules/validator/validator.min.js";
// @codekit-prepend quiet "../node_modules/micromodal/dist/micromodal.min.js";

// @codekit-prepend "./modules/_beforeAfter.js";
// @codekit-prepend "./modules/_credits.js";
// @codekit-prepend "./modules/_breakpoints.js";
// @codekit-prepend "./modules/_dynamicGrid.js";
// @codekit-prepend "./modules/_forms.js";
// @codekit-prepend "./modules/_gliders.js";
// @codekit-prepend "./modules/_instagramFeed.js";
// @codekit-prepend "./modules/_mobileMenu.js";
// @codekit-prepend "./modules/_modals";
// @codekit-prepend "./modules/_projectFilter.js";
// @codekit-prepend "./modules/_scrolling.js";
// @codekit-prepend "./modules/_services.js";
// @codekit-prepend "./modules/_shopRoom.js";
// @codekit-prepend "./modules/_sizing.js";
// @codekit-prepend "./modules/_team.js";
// @codekit-prepend "./modules/_theme.js";
// @codekit-prepend "./modules/_tools.js";

//////////////////////////////////////////////////////////////////////////////////////////
////  Execute Theme
//////////////////////////////////////////////////////////////////////////////////////////

let credits = new Credits();
let dynamicGrid = new DynamicGrid();
let forms = new Forms();
let gliders = new Gliders();
let instagramFeed = new InstagramFeed();
let mobileMenu = new MobileMenu();
let modals = new Modals();
let scrolling = new Scrolling();
let sizing = new Sizing();

Theme.init([
  dynamicGrid,
  forms,
  gliders,
  instagramFeed,
  mobileMenu,
  modals,
  scrolling,
  sizing,
  credits,
]);

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 550,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});
