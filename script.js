var key = "5ac110fde26370792fef708e7e50de6d"
var cities = []
var api = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

var searchHistoryList = $('#search-history-list');
var searchCityInput = $("#search-city");
var searchCityButton = $("#search-city-button");
var clearHistoryButton = $("#clear-history");