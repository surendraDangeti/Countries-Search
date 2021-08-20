let searchInputEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);
    console.log(country)

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p")
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl)
}


function displaySearchResults() {
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country)
        }
    }
}

function getCoutries() {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    let options = {

        method: "GET"
    }
    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none")

    fetch(url, options)

    .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none")

            countriesList = jsonData;
            displaySearchResults()
        });
}


function onChangeSearchInput(evet) {
    searchInputVal = event.target.value;
    getCoutries();
}
getCoutries();
searchInputEl.addEventListener("keyup", onChangeSearchInput);