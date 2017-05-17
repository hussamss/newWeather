// This page is using the dynamic load; however, it is not working according to our desire. 
// The second functionality is with 3 second delay. 
// Onclick on the .getWeather image, delay and show the weather
// $(function() {
// 	$('#scene').click(function() {
// 		var url = "weather.html"
// 	$('#wholePage').load(url + ' #wholePage').hide().delay( 3000 ).fadeIn( 3000 );
// 	});
	
// });

// $('#scene').click (function (e){
//    e.preventDefault(); 

//    setTimeout(function () {
//        window.location.href = "weather.html"; //will redirect to your blog page (an ex: weather.html)
//     }, 3000); //will call the function after 2 secs.

// });

function getLocation(callback) {
    var promise = new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    resolve( position.coords.latitude + "," + position.coords.longitude)
                }
            );
        } else {
          reject("Unknown");
        }
    });

    return promise;
}

var locationPromise = getLocation();
// locationPromise
//       .then(function(loc) { console.log(loc); })
//       .catch(function(err) { console.log("No location"); });

// function getLocation(callback) {
//     var promise = new Promise(function(resolve, reject) {
//         if (navigator.geolocation) {
        	
//             navigator.geolocation.getCurrentPosition(
//                 function(position){
//                     resolve( position.coords.latitude + "," + position.coords.longitude)
//                 }
//             );
//         } else {
        	
//  			window.location.href = "weather.html"; //For browser  that had no geolocation objects//
//           // reject("Unknown");

//         }
//     });

//     return promise;
// }

// var locationPromise = getLocation();
// console.log(locationPromise)
// locationPromise.then(function(loc) { 
// 	window.location.href = "weather.html"; 
// 	// This for SPA, single page application

// 	// 	var url = "weather.html"
// 	// $('#wholePage').load(url + ' #wholePage').hide().delay( 3000 ).fadeIn( 3000 );

//  })




navigator.permissions.query({name:'geolocation'})
  .then(function(permissionStatus) {  
    console.log('geolocation permission state is ', permissionStatus.state);
    if(permissionStatus.state==="denied") {
  			setTimeout(function () {
    	   window.location.href = "weather.html"; //will redirect to your blog page (an ex: weather.html)
    	    }, 1500); //will call the function after 2 secs.
  	}else if(permissionStatus.state==="granted") {
  		   setTimeout(function () {
    	   window.location.href = "weather.html"; //will redirect to your blog page (an ex: weather.html)
    	    }, 1500); //will call the function after 2 secs.
  	}
    

    permissionStatus.onchange = function(result) {

      console.log('geolocation permission state has changed to ', this.state);
      if(this.state==="denied"){
      	window.location.href = "weather.html"; 
  		} else if(this.state==="granted") {
  		   setTimeout(function () {
    	   window.location.href = "weather.html"; //will redirect to your blog page (an ex: weather.html)
    	    }, 3000); //will call the function after 2 secs.
  		}

      //Here in the next few line is to try to make the page load dynamically but 
   	   // 		var url = "weather.html"
			    // $('#wholePage').load(url + ' #wholePage').hide().delay( 3000 ).fadeIn( 3000 );
    };
  });
		


