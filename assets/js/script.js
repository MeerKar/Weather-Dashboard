const APIKey = "c7ae8f207746098d578e7c3839236330";
var formEl = $("#city-form");
var searchCity = $("#city-search");
var searchButton = $("#search-button");
var currentWeather = $("#current-weather");
var fiveDay = $("#fiveDay");
var searchContainer = $("#searchHistory");
var searchHistory = [];
var searchRender = searchHistory;

function getApi(cityName) {
  $("#current-weather").empty("");

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#current-weather").append(`<h2>${data.name}</h2>`);
      $("#current-weather").append(
        `<p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"></img></p>`
      );
      $("#current-weather").append(
        `<p>Temp: <span>${data.main.temp}°F</span></p>`
      );
      $("#current-weather").append(
        `<p>Wind: <span>${data.wind.speed}MPH</span></p>`
      );
      $("#current-weather").append(
        `<p>Humidity: <span>${data.main.humidity}%</span></p>`
      );
    });
}

//fetch the five day forecast for given city and render to page
function fiveDayForecast(cityName) {
  $("#fiveDay").empty("");

  var fiveDayURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var fiveDayArray = data.list;
      console.log(fiveDayArray);
      //for loop to go through five day forecast array, select one reading/per day
      for (var i = 2; i < fiveDayArray.length; i += 8) {
        var currentForecastIndex = fiveDayArray[i];
        fiveDay.append(
          `<div class="col-2 border border-secondary m-1 bg-dark text-white"><p>${moment(
            currentForecastIndex.dt_txt
          ).format(
            "MMM DD, YYYY"
          )}</p><p><img src="https://openweathermap.org/img/wn/${
            currentForecastIndex.weather[0].icon
          }.png"></img></p><p>Temp: <span>${
            currentForecastIndex.main.temp
          }°F</span></p><p>Wind: <span>${
            currentForecastIndex.wind.speed
          }MPH</span></p><p>Humidity: <span>${
            currentForecastIndex.main.humidity
          }%</span></p></div>`
        );
      }
    });
}
// Current Date and time
$(document).ready(function () {
  // To display current time and day
  var displayTime = document.querySelector("#current-weather");
  console.log("displayTime:", displayTime);
  var currentTime = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
  console.log("currentTime:", currentTime);
  displayTime.textContent = currentTime;
});
//render recent search to page with clickable button
function renderSearch() {
  console.log(searchHistory);
  searchContainer.empty();
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("history-btn");
    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchContainer.append(btn);
  }
}

//save city searches to local storage
function setToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);
  localStorage.setItem("cities", JSON.stringify(searchHistory));
  renderSearch();
}

//collect city searches from local storage and render to recent search section
function getHistory() {
  var history = localStorage.getItem("cities");
  if (history) {
    searchHistory = JSON.parse(history);
  }
  renderSearch();
}

function searchCitySubmit(currentCity) {
  $("#city-search").val("");
  console.log(currentCity);
  getApi(currentCity);
  setToHistory(currentCity);
}

//Click Event: Type City, Click Search, Function to log API search results
searchButton.on("click", function (event) {
  event.preventDefault();
  var currentCity = searchCity.val();
  console.log("City:", currentCity);
  searchCitySubmit(currentCity);
});

searchContainer.on("click", ".history-btn", function (event) {
  var savedCity = $(this).text();
  console.log(savedCity);
  searchCitySubmit(savedCity);
});

//call function to save search history
getHistory();
