let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let h6 = document.querySelector("h6");
h6.innerHTML = `${currentDay} ${hour}:${minutes}`;

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  currentTemp.innerHTML = `${temperature}`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "82687c37c8541bddb02cdebf6e86a648";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector(`#city-search`);
  let h1 = document.querySelector("h1");

  function displayCityWeather(response) {
    let weatherDiv = document.querySelector("#temperature");
    let temp = Math.round(response.data.main.temp);
    weatherDiv.innerHTML = `${temp}`;
    h1.innerHTML = `${city}`;

    let precipitation = document.querySelector("#prec");
    precipitation.innerHTML = response.data.clouds.all;
    let humidity = document.querySelector("#hum");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;
  }
  let city = `${cityName.value}`;
  let key = "3a3741f568b40f2a3c9fbb3b60567d17";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayCityWeather);
}
let cityForm = document.querySelector("#searching-form");
cityForm.addEventListener("submit", citySearch);
let curTemp = 23;
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = (curTemp * 9) / 5 + 32 + "°";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = curTemp + "°";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
//
