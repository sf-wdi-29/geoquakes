// define globals
// var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Initialize the Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44},
      zoom: 8
    });
}

$(document).on("ready", function() {

  
	var earthquakeData;
	var earthquakes;

	// Once the document is ready, initialize the map
	initMap();


    // Perform Ajax Get Request for Earthquake Data
  	$.ajax({
	  type: 'GET',
	  url: weekly_quakes_endpoint,
	  dataType: 'json',
	  success: function(data){
		earthquakeData=data;
		earthquakes=earthquakeData['features'];

		// Make new array of quakes with only the (formatted) data desired
		modifiedQuakes = earthquakes.map(function(quake){
		 	var tempDate = new Date((quake.properties.time)*1000);
		 	convertedDate = addZeroes(tempDate.getHours())+":"+addZeroes(tempDate.getMinutes())+":"+addZeroes(tempDate.getSeconds());
			return {
				title: quake.properties.title,
				magnitude: quake.properties.mag,
				time: convertedDate,
				lat: quake.geometry.coordinates[1],
				long: quake.geometry.coordinates[0]
			}
		})

		// Function to add zeroes to timestamps where hours, min, sec are less than zero
		function addZeroes(number) {
			if(number<10){
				number= "0"+number;
			}
			return number;
		}

		// Implement handlebars for display

		source = $('#earthquake-display').html();	
		// compile the handlebars template
		template = Handlebars.compile(source);
		// use the template function from handlebars to create an html string
		developerHtml = template({ features: modifiedQuakes });
		// append html to the view
		$("#info").append(developerHtml);


		// Place markers on the map
		modifiedQuakes.forEach(function(value,index) {
			var myLatLng = {lat: value.lat, lng: value.long};
			marker = new google.maps.Marker({
	        	position: myLatLng,
	        	map: map,
	        	title: value.title
			});
		})
	  }
	});

});
