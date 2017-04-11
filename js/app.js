// findWeather id, on click get the city name and search for site key to get 
// the url for the city.

$('#findWeather').click(function(){
    theSelectedCity = $('#cityName').val();
    $('#notFound').hide();
    if(theSelectedCity) {
        var result = citiesID.find(function (d) {
            if(d.city!=theSelectedCity){

            }else if(d.city===theSelectedCity) {
                return d.city === theSelectedCity;
            }
        }).key_site;

    }else{
        console.log("Here")
        $('#notFound').show();
    }

    var url = "http://dd.weather.gc.ca/citypage_weather/xml"+result;
    console.log(url);
    weather(url);
});

function weather(urlAddress){
    var xmlSource = urlAddress;
    // Cache function to get the most recent data from weather Canada while respecting YQL cache system
    var cacheBuster = Math.floor((new Date().getTime()) / 1200 / 1000);
    // build the yql query. Could be just a string
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&_nocache=" + cacheBuster +"callback=cbfunc&_maxage=3600"
    ].join("");
    //Override Jquery .ajax call to enable cache
    $.ajax({
        url: yqlURL,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'cbfunc'
    });

    window.cbfunc = function(data){
        xmlContent = $(data.results[0]);
        // The City name and the region
        var location = xmlContent.find("location");
        var city = location.find("name");
        var region = location.find("region");
        // var cityRegion = city[0].textContent + ' ' +region[0].textContent;
        $('#theCity').html(theSelectedCity)

        // Weather data from current condition
        var currentCondition = xmlContent.find("currentConditions");
        // find the time and date
        var year = currentCondition.find("year");
        year = year[0].textContent;
        var month = currentCondition.find("month");
        month = month[0].textContent;
        var day = currentCondition.find("day");
        day = day[0].textContent;
        var theTime = year + ' - ' + month + ' - ' + day;
        // $('#theDay').html(theTime);
        var date = currentCondition.find("textSummary");
        date = date[0].textContent;
        var patDate = /.+ 2017 /;
        date = patDate.exec(date);

        $('#theDay').html(date);
        // find the general weather
        var condition = currentCondition.find("condition");

        condition = condition[0].textContent;
        // console.log(condition);
        if(condition===""){
            var tempCon = currentCondition.find("temperature");
            tempCon = tempCon[0].textContent + ' C&deg;'
            $('#theCondition').html(tempCon);

        }else {
            $('#theCondition').html(condition);
        }
        // Display the current weather warnings if they exist
        var alert = xmlContent.find("warnings");console.log(alert);
        var checkAlert = alert[0].attributes.length;
        if (checkAlert >= 1) {
            alert = alert.find("event").attr('type', 'warning');
            alert = alert[0].outerHTML;
            alert = alert.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
            alert = alert.toLowerCase();
            $('.myWarning').attr('style','display: initial;');
            $('.warningDesc').html(alert);
        }else{
            $('.myWarning').attr('style','display: none;');
        }
        // Display the current condition
        var hour = xmlContent.find("dateTime").attr('zone', 'PDT');
        hour = hour.find('hour');
        hour = hour[1].textContent;

        $('src#condition').attr('class','');
        if((condition.search('Cloudy'))!==-1){
            if(hour >=6 && hour <=19){
                $('src#condition').addClass('conditionCloudDay')
            }else {
                $('src#condition').addClass('conditionCloudNight')
            }
        } else if((condition.search('Snow'))!==-1){
            $('src#condition').attr('class','');
            $('src#condition').addClass('conditionSnow');

        } else if((condition.search('Rain'))!==-1){
            $('src#condition').attr('class','');
            $('src#condition').addClass('conditionRain')

        } else {
            $('src#condition').attr('class','');

            if(hour >=6 && hour <=19){
                $('src#condition').addClass('conditionDay')
            }else {
                $('src#condition').addClass('conditionNight')
            }
        }

        // find the temperature
        var temperature = currentCondition.find('temperature');
        temperature = temperature[0].textContent + ' &deg;C';
        $('#theTemp').html(temperature);
        // Another Var to fill temp with large screens
        $('#theTempL').html(temperature);
        console.log(temperature);

        // Find the wind and assign it
        var wind = currentCondition.find("wind");
        var direction = wind.find("direction");
        direction=direction[0].textContent;
        wind = wind.find('speed');
        var windText = direction+ ' '+wind[0].textContent + ' km/h';
        console.log(windText)
        $('#theWind').html(windText);

        // From forecastGroup, forecast for the next two nights and days
        var forecastGroup  = xmlContent.find("forecastGroup");
        var forcasts = forecastGroup.find('forecast');

        // First night or day for the next two nights and two days
       for (var i = 1; i<5; i++) {
   
            var period = forcasts.find("period");       // period contains day/night data
            var temp = forcasts.find("temperature");    // contains temperature data
            var summery = forcasts.find('textSummary'); // contains weather summery such rain,sunny, cloudy ...
            summery = summery[i].textContent;
            var dayName = '#day'+i+'Name';       // the id of day in html file
            var deyDeg = '#nextDay'+i+'Deg';     // the id of temperature in html file
            var imgIcone = 'src#day'+i+'Icon';   // the id of image in html file
            $(dayName).html(period[i].textContent);
            $(deyDeg).html(temp[i].textContent+' &deg;C');

            // plot the condition select the niht or the day. and the condition raining or sunny or other.  
            period = period[i].textContent;
            if(period.search("night")!==-1){
                if(summery.search("rain")!==-1){
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("rainSmallNight");
                }else if(summery.search("snow") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("snowSmallNight");
                }else if(summery.search("cloud") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("couldSmallNight");
                }else if(summery.search("shower") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("showerSmallNight");
                } else {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("clearSmallNight");
                }
            } else {
                $(imgIcone).attr('class','');
                if(summery.search("rain")!==-1){
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("rainSmallDay");
                }else if(summery.search("snow") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("snowSmallDay");
                }else if(summery.search("cloud") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("couldSmallDay");
                }else if(summery.search("shower") !==-1) {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("showerSmallDay");
                } else {
                    $(imgIcone).attr('class','');
                    $(imgIcone).addClass("clearSmallDay");
                }
            }//else
        }//for loop
    }//window.cbfunc
}//weather