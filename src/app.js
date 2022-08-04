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
}

let apiKey = "fd796e85e2a0e40f557a4de490967886";
let cityName = "Lviv";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
