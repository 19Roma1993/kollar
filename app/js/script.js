var $ = jQuery.noConflict();
$(document).ready(function ($) {

  $(window).load(function () {
    setTimeout("$('.loader').add('.preloader').removeClass('active');", 500);
  });

  /* ---------------------------------------------------------------------- */
  /*	NiceScroll code
   /* ---------------------------------------------------------------------- */
  var bodyscr = $('body').niceScroll({
    touchbehavior: false,
    cursoropacitymax: 1,
    cursorwidth: 8
  });
  if(screen.height<=600){
   var menuItems =  $('.menu-item');
   menuItems.addClass('menu-height');
   var menuscr = menuItems.niceScroll({
     touchbehavior: false,
     cursoropacitymax: 1,
     cursorwidth: 8
   });
  }

  /* ---------------------------------------------------------------------- */
  /*	Header show-hide
   /* ---------------------------------------------------------------------- */
  $('.menu-icon').on('click', function (e) {
    e.preventDefault();
    var verticalMenu = $('.menu');

    if (!verticalMenu.hasClass('active')) {
      verticalMenu.addClass('active');
      $(this).addClass('active');
    }
    else {
      verticalMenu.removeClass('active');
      $(this).removeClass('active');
    }
  });


});

