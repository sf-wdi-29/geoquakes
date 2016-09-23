// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var earthquakeData;
var map;
var sfLat = 37.78;
var sfPos = {lat: sfLat, lng: -122.44};
$(document).on("ready", function() 
{
	
  createMap();
  markMap({lat: sfLat, lng: -122.44});
  $.get(weekly_quakes_endpoint, function(data) 
  {
  	earthquakeData = data;
  	displayQuakes();
  });
  
  

});

function displayQuakes()
{
	for (var i = 0; i < earthquakeData.features.length; i++)
	{
		var newQuake = document.createElement("h4");
		newQuake.innerHTML = earthquakeData.features[i].properties.title;
		$("#info").append(newQuake);
		markMap({lat: earthquakeData.features[i].geometry.coordinates[1], lng: earthquakeData.features[i].geometry.coordinates[0]});
	}
}

function createMap()
{
	map  = new google.maps.Map(document.getElementById('map'), 
	{
          center: sfPos,
          zoom: 1
	});
}

function markSF()
{
	var marker = new google.maps.Marker({
    position: sfPos,
    map: map,
    title: 'Hello GA!'
  });
	console.log(marker.position);
}

function markMap(pos)
{
	var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: 'Every Little Earthquake...'
  });
}