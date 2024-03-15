function refreshWeather(response) {
    let temperatureElement = document.querySelector('#temperature');
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let timeElement = document.querySelector('#time');
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector('#icon');

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    //make api and update the interface
    //why did create a new function? Answer: "Seperation of concerns": Want functions to do ONE thing and do it well.
    let apiKey = `ft073a4e6ab40off0ea6fbe4dbf5579b`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    //like saying,"Hey, don't do the usual thing you do when someone submits a form." We're telling the browser not to refresh the page when the form is submitted.
    let searchInput = document.querySelector('#search-form-input');

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = 'ft073a4e6ab40off0ea6fbe4dbf5579b';
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = '';

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml =
                forecastHtml +
                `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
        }
    });

    let forecastElement = document.querySelector('#forecast');
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector('#search-form');
//is finding the search form on the webpage. It's like telling the computer to look for something with the class name 'search-form' in the webpage.
searchFormElement.addEventListener('submit', handleSearchSubmit);
//tells the computer to listen for when someone submits the search form. When it happens, it will run the handleSearchSubmit function we defined earlier.

searchCity('Columbus');
