var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

var map;
var mapCords;
var title; 
var time; 
var timeOfEarthquake;
$(document).ready(function(){

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 8
  });

  $.ajax({ 
  	method: 'GET',
  	url: weekly_quakes_endpoint,
  	success : function (data) {
  		data.features.forEach(function (element) {
  			title = element.properties.title;
  			mapCords = element.geometry.coordinates;
  			timeOfEarthquake = element.properties.time / 1000 / 60 / 60;
  			timeOfEarthquake = Math.floor(timeOfEarthquake);
  			time = Date.now()/ 1000 / 60 / 60;
  			time = Math.floor(time);
  			var inputTime = time - timeOfEarthquake;
  			var lat = mapCords[1];
  			var lng = mapCords[0];
  			$('#info').append("<p>" + title + "<br>" +  "coordinates: " + mapCords +  "<br>" + "Time of earthquake: " + inputTime + " hours ago" + "</p>");

  			new google.maps.Marker({
				  position: new google.maps.LatLng(lat,lng),
				  map: map,
				  title: title
  			});
  		});
  	}
  });

	new google.maps.Marker({
  		position: new google.maps.LatLng(37.7833,-122.4167),
  		map: map,
  		title: "San Francisco"
  	});

});

// This is a code snippet that will place a pin at the coordinates lat & lng
/*
new google.maps.Marker({
  position: new google.maps.LatLng(lat,lng),
  map: map,
  title: title
});
*/
