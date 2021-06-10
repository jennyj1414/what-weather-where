// function to use API to retrieve data for the current position
function getPosition(position) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "4f0c3132958148b431199806e8e0d604";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemperature);
}

// get position
navigator.geolocation.getCurrentPosition(getPosition);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;

  let forecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <div class="forecast-data">
          <img src="media/${
            forecastDay.weather[0].icon
          }.png" alt="" width="80px"/>
          <div class="forecast-temperature-day">
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
            <span class="dash">/ </span>
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
          </div>
        </div>
      </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4f0c3132958148b431199806e8e0d604";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let currentTemperature = document.querySelector(".current-temperature");
  let city = document.querySelector(".city");
  let countryCode = document.querySelector(".country");
  let description = document.querySelector(".current-description");
  let currentHumidity = document.querySelector(".current-humidity");
  let currentWind = document.querySelector(".current-wind");
  let currentDate = document.querySelector(".current-date-value");
  let currentWeatherIcon = document.querySelector(".current-icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  countryCode.innerHTML = response.data.sys.country;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  currentWeatherIcon.setAttribute(
    "src",
    `media/${response.data.weather[0].icon}.png`
  );

  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4f0c3132958148b431199806e8e0d604";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

search("Berlin");
