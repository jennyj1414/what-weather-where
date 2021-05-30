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
  if (hours > 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes > 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let currentTemperature = document.querySelector(".currentTemperature");
  let city = document.querySelector(".city");
  let description = document.querySelector(".description");
  let currentHumidity = document.querySelector(".current-humidity");
  let currentWind = document.querySelector(".current-wind");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  currentDate.innerHTML = formatDate(repsonse.data.dt * 1000);
}
let apiKey = "4f0c3132958148b431199806e8e0d604";

let apiUrl = `api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units-metric`;

axios.get(apiUrl).then(displayTemperature);
