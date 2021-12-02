const weatherForm = document.getElementById('weather-search')
const weatherInput = document.getElementById('city-input')

const currentLocation = document.getElementById('location')
const currentDate = document.getElementById('location-date')
const currentTemp = document.getElementById('current-temp')
const currentHumidity = document.getElementById('current-humidity')
const currentWind = document.getElementById('current-wind')

let searchedCities = JSON.parse(localStorage.getItem('searchedCity')) || [];

function checkSavedCities() {

    if(searchedCities != null) {

        for(var i = 0; i < searchedCities.length; i++)
        
        getWeather(searchedCities[i])
    }
}

function enterCity() {
    
    weatherForm.addEventListener('submit', function (e) {

        e.preventDefault();

        let city = weatherInput.value.trim();

        if (city) {

            getWeather(city)

            searchedCities.push(city)

            localStorage.setItem("searchedCity", JSON.stringify(searchedCities))
        }
        console.log(city);
    });
};

function getWeather(city) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a722e2d1b2d21dd16ce18dcdbac1679d"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(new Date(data.list[0].dt_txt).toDateString()) 

                currentLocation.textContent = (data.city.name);
                currentDate.textContent = new Date(data.list[0].dt_txt).toDateString();
                currentTemp.textContent = (data.list[0].main.temp);
                currentHumidity.textContent = (data.list[0].main.humidity);
                currentWind.textContent = (data.list[0].wind.speed);

                for (var i = 1, f = 0; i < 40, f < 5; i += 8, f++) {

                    let futureDate = document.getElementById('future-date' + (f + 1))
                    let futureTemp = document.getElementById('future-temp' + (f + 1))
                    let futureHumid = document.getElementById('future-humidity' + (f + 1))
                    let futureWind = document.getElementById('future-wind' + (f + 1))

                    futureDate.textContent = new Date(data.list[i].dt_txt).toDateString();
                    futureTemp.textContent = (data.list[i].main.temp);
                    futureHumid.textContent = (data.list[i].main.humidity)
                    futureWind.textContent = (data.list[i].wind.speed);

                }

                for (var i = 0; i < 5; i++) {

                    let searchButton = document.getElementById('search' + (i + 1));

                    console.log(searchButton)

                    if (searchButton.textContent === "") {

                        searchButton.textContent = city

                        return false;

                    } else {
                        searchButton[i + 1]
                    }
                }
            })
        }
    })
}

function test() {

    for (var i = 0; i < 5; i++) {

        let searchButton = document.getElementById('search' + (i + 1));

        searchButton.addEventListener('click', function () {

            let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchButton.textContent + "&units=imperial&appid=a722e2d1b2d21dd16ce18dcdbac1679d";

            fetch(apiUrl).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        
                        currentLocation.textContent = (data.city.name)
                        currentDate.textContent = (new Date(data.list[0].dt_txt).toDateString())
                        currentTemp.textContent = (data.list[0].main.temp)
                        currentHumidity.textContent = (data.list[0].main.humidity)
                        currentWind.textContent = (data.list[0].wind.speed)

                        for (var i = 0, f = 0; i < 40, f < 5; i += 7, f++) {

                            let futureDate = document.getElementById('future-date' + (f + 1))
                            let futureTemp = document.getElementById('future-temp' + (f + 1))
                            let futureHumid = document.getElementById('future-humidity' + (f + 1))
                            let futureWind = document.getElementById('future-wind' + (f + 1))

                            futureDate.textContent = "Date: " + (new Date(data.list[i].dt_txt).toDateString());
                            futureTemp.textContent = "Temp: " + (data.list[i].main.temp);
                            futureHumid.textContent = "Humidity: " + (data.list[i].main.humidity)
                            futureWind.textContent = "Wind: " + (data.list[i].wind.speed);

                        }

                    })
                }
            })
        })
    }
}

test();

enterCity();

onload = checkSavedCities();
