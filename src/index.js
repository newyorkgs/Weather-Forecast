function handleSearchSubmit(event) {
    event.preventDefault();
    //like saying,"Hey, don't do the usual thing you do when someone submits a form." We're telling the browser not to refresh the page when the form is submitted.
    let searchInput = document.querySelector('#search-form-input');
    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector('#search-form');
//is finding the search form on the webpage. It's like telling the computer to look for something with the class name 'search-form' in the webpage.
searchFormElement.addEventListener('submit', handleSearchSubmit);
//tells the computer to listen for when someone submits the search form. When it happens, it will run the handleSearchSubmit function we defined earlier.
