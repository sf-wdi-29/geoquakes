// define globals
var earthquakeApiUrl = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.78,
            lng: -122.44
        },
        zoom: 2
    });
}

$(document).on("ready", function() {

    initMap();

    $.ajax({
        type: "GET",
        url: earthquakeApiUrl,
        dataType: 'json',
        success: function(data) {
            var earthquakes = data.features;
            var source = $("#earthquake-title-template").html();
            var template = Handlebars.compile(source);
            var earthquakeHtml = template({
                earthquakes: earthquakes
            });
            $("#info").append(earthquakeHtml);

            earthquakes.forEach(function(earthquake) {
                var earthquakeLatLng = {
                    lng: earthquake.geometry.coordinates[0],
                    lat: earthquake.geometry.coordinates[1]
                };
                var marker = new google.maps.Marker({
                    position: earthquakeLatLng,
                    map: map
                });
            });

        }

        // CODE IN HERE!
    });
})
