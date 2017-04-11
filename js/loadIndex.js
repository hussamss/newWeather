// $(function() {
// 	var url = "index2.html";
// 	$('#scene').show(3000).delay( 300 ).fadeIn( 3000 );
// 	var url = "weather.html"
// 	$('#wholePage').load(url + ' #wholePage').hide( 30 ).delay( 3000 ).fadeIn( 3000 );
// });

// Onclick on the .getWeather image, delay and show the weather
$(function() {
	$('#scene').click(function() {
		var url = "weather.html"
	$('#wholePage').load(url + ' #wholePage').hide().delay( 3000 ).fadeIn( 3000 );
	});
	
});

