// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var geo;

$(document).on("ready", function() {
  var source=$('#quake-tmpl').html();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
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
           var mag=Math.floor(q.properties.mag);
           console.log(mag);
  switch(mag){
    case 6:
        q.properties['level']="seven";
        break;
    case 5:
        q.properties['level']="six";
        break;
    case 4:
        q.properties['level']="five";
        break;
    case 3:
        q.properties['level']="four";
        break;


  }
          //    if(mag<9){q.properties['level']="six"}
          // else   if(mag < 6.5){q.properties['level']="five"}
          //   else if(mag < 6){}
          //   else  if(mag <5.5){   }
          //   else     if(mag <5 ) {}
          //   else      if(mag < 4.8 && mag > 4) {}

           console.log(q.properties.level)
      });
      //  console.log(list[0].properties.when);
      //console.log(quake.properties.when);
     var tamplate=Handlebars.compile(source);
     var compiled = tamplate({quake:list});
     $('#info').append(compiled);

var qLatLng={lat:0,lng:0};

   list.forEach(function(q){
     qLatLng.lat = q.geometry.coordinates[0];
     qLatLng.lng = q.geometry.coordinates[1];
    //  console.log(list.length)
     var marker = new google.maps.Marker({
       position: qLatLng,
       map: map,
     });
   })
   }//end success
  })//end ajax


});
