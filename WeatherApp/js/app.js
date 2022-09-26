const cities = ["Delhi","Chandigarh","Mumbai","Bangalore","Jaipur"];
// const apiKey = "09a8167106abb263fc6c7dd6ba05a565";
const apiKey = "7e3f21edee540e6110af347b55eb1ab2";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchField = document.querySelector('.search-field');
searchField.addEventListener('keypress', setSearchQuery);
  
function setSearchQuery(searchEvent) {
    if (searchEvent.keyCode == 13) {
        let searchValue = searchField.value;
        if(searchValue != null && searchValue.length > 0){
            getSearchResults(searchValue);
        } else {
            console.log('Enter City Name. It is required Field.');
        }
    }
}
  
function getSearchResults (searchQuery) {
    fetch(`${baseUrl}?q=${searchQuery}&units=metric&appid=${apiKey}`)
    .then(weatherData => {
        if (weatherData.ok) {  
            return weatherData.json();
        }
        throw new Error('City Not Found');
    }).then((responseData)=>{
        displayWeatherData(responseData)
    }).catch((error) => {
        console.error(error);
      });
}
  
function displayWeatherData (weatherData) {
    let cityElement = document.querySelector('.location .city-name');
    cityElement.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

    let now = new Date();
    let todayDateElement = document.querySelector('.location .today-date');
    todayDateElement.innerText = dateBuilder(now);

    let temperatureElement = document.querySelector('.today .temperature');
    temperatureElement.innerHTML = `${Math.round(weatherData.main.temp)}<span>°c</span>`;

    let weatherElement = document.querySelector('.today .weather');
    weatherElement.innerText = weatherData.weather[0].main;

    let highLowElement = document.querySelector('.today .high-low');
    highLowElement.innerText = `${Math.round(weatherData.main.temp_min)}°c / ${Math.round(weatherData.main.temp_max)}°c`;
}
  
function dateBuilder (d) {
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = daysList[d.getDay()];
    let date = d.getDate();
    let month = monthsList[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomCityIndex = getRandomInt(0,4);
getSearchResults(cities[randomCityIndex]);