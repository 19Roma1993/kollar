$(document).ready(function ($) {
  $('.switch-content').hide();
  $('.contact-switcher').on('click', function (e) {
    e.preventDefault();
    var contactContent = $('.contact-info').add('.contact-form-wrap');
    if (!contactContent.hasClass('active')) {
      contactContent.addClass('active');
      $('.switch-map').hide();
      $('.switch-content').show();
    }
    else {
      contactContent.removeClass('active');
      $('.switch-map').show();
      $('.switch-content').hide();
    }
  });

  /* ---------------------------------------------------------------------- */
  /*	Contact Map
   /* ---------------------------------------------------------------------- */
  google.maps.event.addDomListener(window, 'load', init);
  var map;
  function init() {
    var mapOptions = {
      center: new google.maps.LatLng(48.9219338,24.7239892),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
      },
      disableDoubleClickZoom: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      scaleControl: true,
      scrollwheel: false,
      panControl: true,
      streetViewControl: true,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
      ['Title of Marker', 'Description', 'Telephone No', 'Email', 'Website', 48.9205584, 24.710444499999994, 'https://mapbuildr.com/assets/img/markers/hollow-pin-red.png'],['Title of Marker', 'Description', 'Telephone No', 'Email', 'Website', 48.92240959999999, 24.729335900000024, 'https://mapbuildr.com/assets/img/markers/hollow-pin-orange.png']
    ];
    for (i = 0; i < locations.length; i++) {
      if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
      if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
      if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
      if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
      if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
      marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(locations[i][5], locations[i][6]),
        map: map,
        title: locations[i][0],
        desc: description,
        tel: telephone,
        email: email,
        web: web
      });
      if (web.substring(0, 7) != "http://") {
        link = "http://" + web;
      } else {
        link = web;
      }
      bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
    }
    function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
      var infoWindowVisible = (function () {
        var currentlyVisible = false;
        return function (visible) {
          if (visible !== undefined) {
            currentlyVisible = visible;
          }
          return currentlyVisible;
        };
      }());
      iw = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        if (infoWindowVisible()) {
          iw.close();
          infoWindowVisible(false);
        } else {
          var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p><p>"+telephone+"<p><a href='mailto:"+email+"' >"+email+"<a><a href='"+link+"'' >"+web+"<a></div>";
          iw = new google.maps.InfoWindow({content:html});
          iw.open(map,marker);
          infoWindowVisible(true);
        }
      });
      google.maps.event.addListener(iw, 'closeclick', function () {
        infoWindowVisible(false);
      });
    }
  }

});
