function displayTemperature(response) {
  console.log(response.data);
}
let apiKey = "4f0c3132958148b431199806e8e0d604";

let apiUrl = `api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units-metric`;

axios.get(apiUrl).then(displayTemperature);
