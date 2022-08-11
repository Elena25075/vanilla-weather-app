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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `  
              <div class="col-2">
                <div class="forecast-time">${formatDay(day.dt)}</div>
                <div class="forecast-icon">
                  <img
                    class="forecast-icon"
                    src="src/images/icons/${day.weather[0].icon}.png"
                    alt="icon"
                  />
                </div>
                <div class="forecast-temperature">
                  <span class="max-temperature">${Math.round(
                    day.temp.max
                  )}° </span>
                  <span class="min-temperatire"> ${Math.round(
                    day.temp.min
                  )}°</span>
                </div>
              </div>
  
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coords) {
  let apiKey = "fd796e85e2a0e40f557a4de490967886";
  let lon = coords.lon;
  let lat = coords.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let userCity = response.data.name;
  city.innerHTML = userCity;

  let currentTemprature = Math.round(response.data.main.temp);
  let temprature = document.querySelector("#temprature");
  temprature.innerHTML = currentTemprature;

  celsiusTemperture = response.data.main.temp;

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
  let bgImageUrl = `src/images/bg/${iconIndex}.png`;
  let bgImage = document.querySelector("img");

  bgImage.setAttribute("src", bgImageUrl);

  formatDate();
  getForecast(response.data.coord);
}

function toFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("notActive");
  fahrenheit.classList.add("notActive");

  let temprature = document.querySelector("#temprature");
  let fahrenheitTemperature = (celsiusTemperture * 9) / 5 + 32;
  temprature.innerHTML = Math.round(fahrenheitTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let userCity = document.querySelector("#userCity");
  search(userCity.value);
}

function search(cityName) {
  let apiKey = "fd796e85e2a0e40f557a4de490967886";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function toCelsius(event) {
  event.preventDefault();
  celcius.classList.add("notActive");
  fahrenheit.classList.remove("notActive");
  let temprature = document.querySelector("#temprature");
  temprature.innerHTML = Math.round(celsiusTemperture);
}

let celsiusTemperture = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toFahrenheit);

let celcius = document.querySelector("#celsius-link");
celcius.addEventListener("click", toCelsius);

search("lviv");
