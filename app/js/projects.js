var projectContent = $('.project-content'),
  singleProjectWrap = $('.single-project-wrap'),
  filter = $('.filter').find('.menu-item-link');
$(document).ready(function ($) {
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
  //var filterscr = $('.filter').find('.sub-list').niceScroll({
  //  touchbehavior: false,
  //  cursoropacitymax: 1,
  //  cursorwidth: 8
  //});
  filter.click(function () {
    var selector = $(this).attr('data-filter');
    filter.removeClass('active');
    $(this).addClass('active');
    $('.project-content').isotope({
      filter: selector
    });
  });

  //  PROJECT LIST
  /* ---------------------------------------------------------------------- */
  /*	Post zoom
   /* ---------------------------------------------------------------------- */
  $('.project-zoom').on('click', function (e) {
    e.preventDefault();

    var chosenPost = $(this).parents('.post'),
      openedPost = $('.post').filter('.opened'),
      projectId = chosenPost.find('.project').attr('data-id'),
      projectGallery = chosenPost.find('.post-gallery');
    var storage = document.createElement('div');
    storage.classList.add('hereIAm');
    $(storage).load("projects.html .single-project[data-id=" + projectId + "] .single-project-img", function () {
      $(storage).find('.single-project-img:gt(0)').appendTo(projectGallery);
    });

    $('.large-post').filter('.active').removeClass('active');
    openedPost.find('.post-content').removeClass('active');
    openedPost.removeClass('opened');

    chosenPost.find('.post-content').addClass('active');
    chosenPost.addClass('opened');
    chosenPost.find(".large-post").addClass('active');
    setTimeout("reconstructIsotope();", 500);
  });

  /* ---------------------------------------------------------------------- */
  /*	Post: slide prev and next images after zoom
   /* ---------------------------------------------------------------------- */
  $('.close').on('click', function (e) {
    e.preventDefault();
    var chosenPost = $(this).parents('.post'),
      projectGallery = chosenPost.find('.post-gallery');
    chosenPost.find('.post-content').removeClass('active');
    chosenPost.find('.large-post').removeClass('active');
    $('.post').filter('.opened').removeClass('opened');
    projectGallery.find('.single-project-img:gt(0)').remove();
    projectGallery.find('.single-project-img:first-child').addClass('open');
    setTimeout("reconstructIsotope();", 500);
  });

  $('.prev').on('click', function (e) {
   e.preventDefault();
   var x = $(this).parents('.post').find('.single-project-img').filter('.open');
   var y = x.index();
   if (y > 0) {
     x.removeClass('open').prev('img').addClass('open');
   }
  });

  $('.next').on('click', function (e) {
   e.preventDefault();
   var x = $(this).parents('.post').find('.single-project-img').filter('.open');
   var y = x.index();
   var z = $(this).parents('.post').find('.single-project-img').length;
   if (y < z - 1) {
     x.removeClass('open').next('img').addClass('open');
   }
  });


  //  SINGLE PROJECT
  /* ---------------------------------------------------------------------- */
  /* open and close single-project
   /* ---------------------------------------------------------------------- */
  $('.project').on('click', function (e) {
    e.preventDefault();
    $('.loader').addClass('active');
    get_project($(this).attr("data-id"));
  });

  singleProjectWrap.on('click', '.single-project-close', function (e) {
    e.preventDefault();
    projectContent.removeClass('hidden');
    setTimeout("projectContent.removeClass('active');", 1);
    setTimeout("singleProjectWrap.html('').removeClass('active');reconstructIsotope();", getTransitionDuration(projectContent));
    $('.menu-icon').removeClass('hidden');
    $('body').delay(1000).getNiceScroll().resize();
  });
  /* ---------------------------------------------------------------------- */
  /*	Move projects
   /* ---------------------------------------------------------------------- */
  singleProjectWrap.on('click', '.single-project-next', function (e) {
    e.preventDefault();
    var current_project = $('.project[data-id="'
                            + $(this).parents('.single-project').attr('data-id')
                            + '"]').parents('.post');
    if (current_project.next().is('.post')) {
      var next_project = current_project.next('.post').children('.post-content').find('a.project').attr('data-id');
      get_project(next_project, true);
    }
  });

  singleProjectWrap.on('click', '.single-project-prev', function (e) {
    e.preventDefault();
    var current_project = $('.project[data-id="'
                            + $(this).parents('.single-project').attr('data-id')
                            + '"]').parents('.post');
    if (current_project.prev().is('.post')) {
      var prev_project = current_project.prev('.post').children('.post-content').find('a.project').attr('data-id');
      get_project(prev_project, true);
    }
  });

});

/* ---------------------------------------------------------------------- */
/*	Isotop reconstruct function
 /* ---------------------------------------------------------------------- */
function reconstructIsotope() {
  $('.project-content').isotope({
    layoutMode: 'packery',
    percentPosition: true,
    itemSelector: '.post'
  });
}
/* ---------------------------------------------------------------------- */
/*	flexslider
 /* ---------------------------------------------------------------------- */
function flexslider() {
  // The slider being synced must be initialized first
  $('.single-project-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '.single-project-slider'
  });
  $('.single-project-slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    after: function(){
      $('.single-project-slider').find('li').getNiceScroll().resize();
    },
    slideshow: false,
    sync: ".single-project-carousel"
  });
}
/* ---------------------------------------------------------------------- */
/*	Get project with id parameter
 /* ---------------------------------------------------------------------- */
function get_project(id_project, move) {
  move = typeof move !== 'undefined' ? move : false;

  if (move === true) {
    singleProjectWrap.html("");
  }
  singleProjectWrap.load("projects.html .single-project[data-id=" + id_project + "]", null, function () {

    singleProjectWrap.imagesLoaded(function () {
      flexslider();
      $('.loader').removeClass('active');
      singleProjectWrap.add('.project-content').addClass('active');
      var prjscroll = $('.single-project-slider').find('li').niceScroll({
        touchbehavior: false,
        cursoropacitymax: 0
      });
      if (move === false) {
        setTimeout("projectContent.addClass('hidden');", getTransitionDuration(projectContent));
        $('.menu').removeClass('active');
        $('.menu-icon').removeClass('active').addClass('hidden');
      }
    });
  });
}
function getTransitionDuration(selector){
  if(typeof selector.css('transition-duration')!=='undefined'){
    return Math.round(parseFloat(selector.css('transition-duration')) * 1000);
  }
  else if(typeof selector.css('-webkit-transition-duration')!=='undefined'){
    return Math.round(parseFloat(selector.css('-webkit-transition-duration')) * 1000);
  }
  else if(typeof selector.css('-moz-transition-duration')!=='undefined'){
    return Math.round(parseFloat(selector.css('-moz-transition-duration')) * 1000);
  }
  else if(typeof selector.css('-ms-transition-duration')!=='undefined'){
    return Math.round(parseFloat(selector.css('-ms-transition-duration')) * 1000);
  }
  else if(typeof selector.css('-o-transition-duration')!=='undefined'){
    return Math.round(parseFloat(selector.css('-o-transition-duration')) * 1000);
  }
}
