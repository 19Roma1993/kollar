$(document).ready(function ($) {
});
$(window).load(function () {
  $(this).imagesLoaded(function () {
    reconstructIsotope();
  });
  $('body').delay(1000).getNiceScroll().resize();
});
/* ---------------------------------------------------------------------- */
/*	Isotop reconstruct function
 /* ---------------------------------------------------------------------- */
function reconstructIsotope() {
  $('.blog').isotope({
    layoutMode: 'packery',
    percentPosition: true,
    itemSelector: '.blog-post'
  });
}