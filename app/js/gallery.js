$(document).ready(function ($) {
  var $container = $('.gallery');
  var $filter = $('.filter').find('.menu-item-link');
//  GENERAL PAGE
  /* ---------------------------------------------------------------------- */
  /*	image loader
   /* ---------------------------------------------------------------------- */
  $(window).load(function () {
    $(this).imagesLoaded(function () {
      reconstructIsotope();
    });
    $('body').delay(1000).getNiceScroll().resize();
  });

  // Isotope Filter
  $filter.click(function () {
    var selector = $(this).attr('data-filter');
    $filter.removeClass('active');
    $(this).addClass('active');
    try {
      $container.isotope({
        filter: selector
      });
      return false;
    } catch (err) {

    }
  });

  $('.gallery').lightGallery({
    //mode: 'lg-slide-circular'
    //actualSize: false
  });

});
/* ---------------------------------------------------------------------- */
/*	Isotop reconstruct function
 /* ---------------------------------------------------------------------- */
function reconstructIsotope() {
  $('.gallery').isotope({
    layoutMode: 'packery',
    percentPosition: true,
    itemSelector: '.post'
  });
}