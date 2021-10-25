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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `017d56650cd168d68067850318775d43`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(`${apiURL}`).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.weather[0].icon);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemp = response.data.main.temp;
  getForecast(response.data.coord);
  console.log(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=017d56650cd168d68067850318775d43`;
  axios.get(`${apiUrl}`).then(displayTemperature);
  displayCelciusTemp(event);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row"> `;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                  <div class="weather-forecast-date">${formatForecastDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                  />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecate-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);
