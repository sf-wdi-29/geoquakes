// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var geo;

$(document).on("ready", function() {
  var source=$('#quake-tmpl').html();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 8
  });
  $.ajax({
    type:'GET',
    dataType: 'json',
    url:weekly_quakes_endpoint,
    success:function(data){
      //console.log(data);
      geo=data;
      var list=geo.features;
      list.forEach(function(q){
          var now= Date.now();
          var differenceTravel = now - q.properties.time;
          var totalSec = Math.floor((differenceTravel) / (1000));
          var hours = parseInt( totalSec / 3600 ) % 24;
           q.properties['when']=hours+" hours ago.";
      });
      //  console.log(list[0].properties.when);
      //console.log(quake.properties.when);
     var tamplate=Handlebars.compile(source);
     var compiled = tamplate({quake:list});
 $('#info').append(compiled);

   }//end success
  })//end ajax



  function initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }
  initMap();
});
