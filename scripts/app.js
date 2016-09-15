var myObj = new Object();
$(document).on("ready", function() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.68, lng: -122.44},
          zoom: 6

      })
var url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
$.get(url, function(data) {
var quake = data.features
quake.forEach(function(obj, index) {
var newQuake = quake[index].properties.title
var time = Math.round((Date.now()-(quake[index].properties.time))/3600000)
$("#info").append("<p>" + newQuake + ", it happened " + time + " hours ago</p>")
	
	var coords = quake[index].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[0],coords[1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
})
})



})
});


// var source = $("quakeplate").html();
// var template = Handlebars.compile(source);
// var data = {
