// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;


$(document).on("ready", function() {

    $.ajax({
      type: 'GET',
      url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
      dataType: 'json',
      success: function(data) {
        earthQuakeData = data;
        features = earthQuakeData.features;
            // for (var i = 0; i < data['features'].length; i++) {
            //     console.log(data['features'][i]['geometry']['coordinates']);
            //     console.log(data['features'][i]['properties']['title']);
            //     console.log(data['features'][i]['properties']['mag']);
            // }
        initMap();
        onSuccess(features);
        }
    });





function onSuccess(stuff) {
      for (var i = 0; i < stuff.length; i++) {
        $('#developers-list').append('<li>' + stuff[i].properties.title + '</li>');

      var marker = new google.maps.Marker({
          position: {lat: stuff[i].geometry.coordinates[1], lng: stuff[i].geometry.coordinates[0]},

          map: map

        });

      }
  }



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 2
  });}

});


