var autoDetectedCity;
var theSelectedCity;
navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {

// 
    // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
    // Those geocoding to test other city across the country
    // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 49.2827 + '%2C' + -123.116226 + '&language=en';//Vancouver test
    // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 51.131470 + '%2C' + -114.010559 + '&language=en';//Calgary test
    // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 52.146973 + '%2C' + -106.647034 + '&language=en';//Saskatoon test
    var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 49.895077 + '%2C' + -97.138451+ '&language=en';//Winnpeg test
    // var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 43.653908 + '%2C' + -79.384293+ '&language=en';//Toronto test
    console.log("I am running in the here")
    

    // get the location data from google maps api 
    $.getJSON(geocoding).done(function(location) {
        // fetch the results to find the City and Province for auto detect of weather function
        // location.results[3] contains the address of the city, province, country
        var tempLocation = location.results[3].formatted_address;

        // regExp for the city and province 
        var addressPat = /(\w+|\w+ \w+), (AB|BC|ON|MB|QC|SK|NL|NS|NU|NT|YT|PE|NB)/;
        var cityProName = addressPat.exec(tempLocation);

        // location.results[3] contains the city, province, country, info
        // some case it may be null, we fetch location.results[2] to get more
        // info about the location and extract the city and province.
        if(cityProName===null){
            tempLocation = location.results[2].formatted_address;
            cityProName = addressPat.exec(tempLocation);
        }
        
        autoDetectedCity = cityProName[0];

         if(autoDetectedCity) {
        var result = citiesID.find(function (d) {
            if(d.city!=autoDetectedCity){
                
            }else if(d.city===autoDetectedCity) {
                return d.city === autoDetectedCity;
            }
        }).key_site;
        
        }
    var url = "http://dd.weather.gc.ca/citypage_weather/xml"+result;
    theSelectedCity = autoDetectedCity;
    weather(url);
    })

}
    function error(err) {
    // console.log(err)
    }