var searchCity = $("#city-search");
var searchButton = $("#search-button");
var currentWeather = $("#current-weather");
var fiveDay = $("#fiveDay");
var searchContainer = $("#searchHistory");
var searchHistory = [];
var searchRender = searchHistory;

const apiKey = "c7ae8f207746098d578e7c3839236330";

// Current Date and time
$(document).ready(function () {
  var displayTime = document.querySelector("#current-weather");
  console.log("displayTime:", displayTime);
  var currentTime = dayjs().format("dddd, MMMM D, YYYY");
  console.log("currentTime:", currentTime);
  displayTime.textContent = currentTime;
});

function getApi(cityName) {
  $("#current-weather").currentWeather;
  var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Weather data:", data);

      currentWeather.empty();
      currentWeather.append(`<h2>${data.name}</h2>`);

      var weatherIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      $("#weatherIconToday").attr("src", weatherIconUrl);

      currentWeather.append(
        `<p>
          <img src="${weatherIconUrl}" alt="Weather icon">
        </p>`
      );
      currentWeather.append(`<p>Temp: <span>${data.main.temp}°F</span></p>`);
      currentWeather.append(`<p>Wind: <span>${data.wind.speed}MPH</span></p>`);
      currentWeather.append(
        `<p>Humidity: <span>${data.main.humidity}%</span></p>`
      );
      var currentDate = dayjs().format("dddd, MMMM D, YYYY");
      currentWeather.append(`<p>Current Date: <span>${currentDate}</span></p>`);
    });
}

function getFiveDayForecast(cityName) {
  var fiveDayContainer = $("#fiveDay");
  fiveDayContainer.empty();

  var fiveDayURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Five-day forecast data:", data);

      var fiveDayArray = data.list;

      // Looping through the forecast array
      for (var i = 0; i < fiveDayArray.length; i += 8) {
        var currentForecastIndex = fiveDayArray[i];
        var formattedDate = dayjs(currentForecastIndex.dt_txt).format(
          "DD/MM/YYYY"
        );

        var weatherIconUrl =
          "https://openweathermap.org/img/w/" +
          currentForecastIndex.weather[0].icon +
          ".png";
        $("#weatherIconDay" + i).attr("src", weatherIconUrl);
        var cardHtml = `
    <div class="card forecast-item">
      <div class="card-body">
        <h5 class="card-title">${formattedDate}</h5>
        <p><img src="${weatherIconUrl}" alt="Weather icon"></p>
        <p class="card-text">Temp: ${currentForecastIndex.main.temp}°F</p>
        <p class="card-text">Wind: ${currentForecastIndex.wind.speed}MPH</p>
        <p class="card-text">Humidity: ${currentForecastIndex.main.humidity}%</p>
      </div>
    </div>
  `;
        fiveDayContainer.append(cardHtml);
      }
    })
    .catch(function (error) {
      console.error("Error fetching 5-day forecast data:", error);
    });
}

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

// function for Search history
function setToHistory(search) {
  if (search.trim() === "") {
    return;
  }

  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);
  searchHistory = searchHistory.filter(function (city) {
    return city.trim() !== "";
  });
  localStorage.setItem("cities", JSON.stringify(searchHistory));
  renderSearch();
}

// get the search from local storage for rendering recent search
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
  getFiveDayForecast(currentCity);
  setToHistory(currentCity);
}

//Click Event:
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

// Call the  function
getHistory();
