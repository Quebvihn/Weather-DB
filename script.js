var key = "5ac110fde26370792fef708e7e50de6d"
var cities = []
var api = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

var historyList = $('#search-history-list');
var cityInput = $("#search-city");
var cityButton = $("#search-city-button");
var clearButton = $("#clear-history");

var City = $("#current-city");
var temp = $("#current-temp");
var humidity = $("#current-humidity");
var windSpeed = $("#current-wind-speed");
var uvIndex = $("#uv-index");

var weatherContent = $("#weather-content");

var date = dayjs().format("MM/D/YYYY")


function search(searchValue) {
    
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + key;
    

    fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function(response){
        console.log(response);
        City.text(response.name);
        City.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + date + ")");
        City.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        temp.text(response.main.temp);
        temp.append("&deg;F");
        humidity.text(response.main.humidity + "%");
        windSpeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        

        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + key;
        
        fetch(uvUrl)
  .then(function (response) {
    return response.json();
        }).then(function(response){
            
            uvIndex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + key + "&lat=" + lat +  "&lon=" + lon;
        
        
        fetch(forecastURL)
  .then(function (response) {
    return response.json();
        }).then(function(response){
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {

                var forecastDateString = dayjs(response.list[i].dt_txt).format("MM/D/YYYY");
                console.log(forecastDateString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                
                

            }
        });

    });

    

};

cityButton.on("click", function(event){
    event.preventDefault();


    var searchValue = cityInput.val().trim();

    search(searchValue)
    searchHistory(searchValue);    
    cityInput.val(""); 
});

function searchHistory(searchValue) {

    if (searchValue) {

        if (cities.indexOf(searchValue) === -1) {
            cities.push(searchValue);


            listArray();
            clearButton.removeClass("hide");
            weatherContent.removeClass("hide");
        } else {

            var removeIndex = cities.indexOf(searchValue);
            cities.splice(removeIndex, 1);

 
            cities.push(searchValue);


            listArray();
            clearButton.removeClass("hide");
            weatherContent.removeClass("hide");
        }
    }
    
}

function listArray() {
    
    historyList.empty();
   
    
    cities.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        historyList.prepend(searchHistoryItem);
    });
    
    localStorage.setItem("cities", JSON.stringify(cities));
    
}

function reload() {
    if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cities.length - 1;

        listArray();

        if (cities.length !== 0) {
            search(cities[lastIndex]);
            weatherContent.removeClass("hide");
        }
    }
}

reload();

clearButton.on("click", function(){
    
    cities = [];
    
    listArray();
    
    $(this).addClass("hide");
});