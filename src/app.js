let now = new Date();
let hour = now.getHours();
let amOrPm = hour >= 12 ? "pm" : "am";
hour = hour % 12 || 12;
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let h5 = document.querySelector("h5");
h5.innerHTML = ` ${day} ${hour}:${minute} ${amOrPm} `;

function displayTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}℃`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=017d56650cd168d68067850318775d43`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);