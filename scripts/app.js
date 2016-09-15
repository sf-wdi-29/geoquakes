// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var rawEarthquakeData;
var map;

function createGoogleMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 2
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
      console.log("i am here!")
      selectFeatures.forEach(function(location) {
        var latLng = {lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0]};
//        var lng = location.geometry.coordinates[0];
        console.log(latLng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });

      });

    }    

  });



});


