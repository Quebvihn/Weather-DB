var key = "5ac110fde26370792fef708e7e50de6d"
var cities = []
var api = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

var history = $('#search-history-list');
var cityInput = $("#search-city");
var cityButton = $("#search-city-button");
var clearButton = $("#clear-history");

var City = $("#current-city");
var Temp = $("#current-temp");
var Humidity = $("#current-humidity");
var windSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");

var weatherContent = $("#weather-content");




