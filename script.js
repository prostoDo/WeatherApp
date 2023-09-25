const input = document.getElementById('input');
const form = document.getElementById('form');
const submitForm = document.getElementById('submit');
const city = document.getElementById('city');
const weatherType = document.getElementById('weather-type');
const celci = document.getElementById('celci');
const feels = document.getElementById('feels');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const errorMsg = document.getElementById('error');

let errorStatus;

window.onload = function () {
  fetchWeather('Moscow');
};

submitForm.addEventListener('click', (e) => {
  e.preventDefault();
  getWeatherData(location);
});

async function fetchWeather(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=7e3b2d37c3c2403f9f9195016231709&q=${location}`,
    { mode: 'cors' },
  );

  if (response.status === 400) {
    errorStatus = true;
  } else {
    errorStatus = false;
    const weatherData = await response.json();
    const newData = displayData(weatherData);
  }
  throwErrorMsg();
  reset();
}

function displayData(data) {
  weatherType.textContent = `${data.current.condition.text}`;
  city.textContent = `${data.location.name}, ${data.location.country}`;
  celci.textContent = `${data.current.temp_c}`;
  feels.textContent = `FEELS LIKE: ${data.current.feelslike_c}`;
  wind.textContent = ` WIND: ${data.current.wind_mph}`;
  humidity.textContent = `HUMIDITY: ${data.current.humidity}`;
}

function throwErrorMsg() {
  if (errorStatus) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
  }
}

function reset() {
  form.reset();
}

function getWeatherData() {
  const userLocation = input.value;
  fetchWeather(userLocation);
}
