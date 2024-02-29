function refreshWeather(response) {
    let temperatureElement = document.querySelector('#temperature');
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = response.data.city;

    temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector('#search-form');
//is finding the search form on the webpage. It's like telling the computer to look for something with the class name 'search-form' in the webpage.
searchFormElement.addEventListener('submit', handleSearchSubmit);
//tells the computer to listen for when someone submits the search form. When it happens, it will run the handleSearchSubmit function we defined earlier.

searchCity('Columbus');
