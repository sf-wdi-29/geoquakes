// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var rawEarthquakeData;
var map;

function createGoogleMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 8
    });

  var latLng = new google.maps.LatLng(37.78,-122.44);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

}

$(document).on("ready", function() {

  createGoogleMap();

  // Fetch earthquake JSON
  $.ajax({
    type: 'GET',
    url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson',
    dataType: 'json',
    success: function(rawEarthquakeData) {
      console.log(rawEarthquakeData);
      selectFeatures = rawEarthquakeData['features'];

      //handlebars template
      var source = $('#earthquake').html();
      var template = Handlebars.compile(source);

      var cleanEarthquakeData = template({ earthquakeToday: selectFeatures });
      $("#info").append(cleanEarthquakeData);

      //create map coordinates and markers
      selectFeatures.forEach(function(location) {
        var latLng = new google.maps.LatLng(location.geometry.coordinates[1], location.geometry.coordinates[0]);
//        var lng = location.geometry.coordinates[0];
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });

      });

    }    

  });


});
