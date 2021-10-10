function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let amOrPm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[now.getDay()];
  return ` ${day} ${hour}:${minute} ${amOrPm} `;
}

function displayTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  let dayElement = document.querySelector("#dayTime");
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  //` ${day} ${hour}:${minute} ${amOrPm} `;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=017d56650cd168d68067850318775d43`;
  axios.get(`${apiUrl}`).then(displayTemperature);
  console.log(apiUrl);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
