var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

var map;
var title;

$(document).ready(function(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.468319, lng: -122.143936},
		zoom: 3
	});

	$.ajax({
  		method: 'GET',
  		url: weekly_quakes_endpoint,
  		success: function (element) {
  			var places = element.features;
  			places.forEach(function(ele) {
  				var timeOfEarthquake = Math.round(ele.properties.time / 1000 / 60 / 60);
  				var currentTime = Math.round(Date.now() / 1000 / 60 / 60);
  				var timeSinceQuake = currentTime - timeOfEarthquake;
  				title = ele.properties.title
  				$('#info').append("<p>" + title + " - " + timeSinceQuake + " hours since quake" + "</p>");
  				console.log(ele.properties.title);

  				//Draws circle on earthquake site
  				var placeOfEarthquake = ele.geometry.coordinates;
  				var latt = placeOfEarthquake[1];
  				var lngg = placeOfEarthquake[0];
  				var size = ele.properties.mag;
  				//console.log(size);
  				new google.maps.Circle({
  					//position: new google.maps.LatLng(latt,lngg),
  					map: map,
  					title: title,
  					strokeColor: 'blue',
      			strokeOpacity: 0.8,
      			strokeWeight: 2,
      			fillColor: 'blue',
      			fillOpacity: 0.35,
      			center: {lat: latt, lng: lngg},
    				radius: size * 20000
  				})
  			})
  		}
	});
})

