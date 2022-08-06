function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let userDate = document.querySelector("#date");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  userDate.innerHTML = `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response);
  let city = document.querySelector("#city");
  let userCity = response.data.name;
  city.innerHTML = userCity;
  let currentTemprature = Math.round(response.data.main.temp);
  let temprature = document.querySelector("#temprature");
  temprature.innerHTML = currentTemprature;
  console.log(temprature);
  let weather = document.querySelector("#weather");
  let currentWeather = response.data.weather[0].description;
  weather.innerHTML = currentWeather;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = currentHumidity;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = currentWind;
  let icon = document.querySelector("#icon");
  let iconIndex = response.data.weather[0].icon;
  let iconUrl = `src/images/icons/${iconIndex}.png`;
  icon.setAttribute("src", iconUrl);
  formatDate();
}

function showCurrentTime(response) {
  console.log(new Date(response.data.dt * 1000));
}

function search(event) {
  event.preventDefault();
  let userCity = document.querySelector("#userCity");
  let apiKey = "fd796e85e2a0e40f557a4de490967886";
  let cityName = userCity.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(showCurrentTime);
}

let apiKey = "fd796e85e2a0e40f557a4de490967886";
let cityName = "Lviv";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(showCurrentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
