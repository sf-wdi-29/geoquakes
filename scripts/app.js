// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 8
  });


  var marker = new google.maps.Marker({
          position: {lat: 37.78, lng: -122.44},
          map: map,
          title: 'Hello World!'
        });
}

$(document).on("ready", function() {

  // CODE IN HERE!
initMap();

$.ajax({
  type: 'GET',
  url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson',
  dataType: 'json',
  success: function(data) {

    var earthquakes = data.features;

    var source = $('#earthquake-template').html();
      var template = Handlebars.compile(source);
      var developerHtml = template({ earthquakes: earthquakes});
      $('#info').append(developerHtml);

    for (var i=0; i<earthquakes.length; i++) {
        
        var marker = new google.maps.Marker({
          position: {lat: earthquakes[i].geometry.coordinates[1], 
                     lng: earthquakes[i].geometry.coordinates[0]},
          map: map,
          title: earthquakes[i].properties.title
        });
      }
     }
  });
});












