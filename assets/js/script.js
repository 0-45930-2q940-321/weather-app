const weatherForm = document.getElementById('weather-search')
const weatherInput = document.getElementById('city-input')

const currentLocation = document.getElementById('location')
const currentDate = document.getElementById('location-date')
const currentTemp = document.getElementById('current-temp')
const currentHumidity = document.getElementById('current-humidity')
const currentWind = document.getElementById('current-wind')

const unHideSearchBtn = document.getElementById('search-history')
const unHideCurrentWeather = document.getElementById('main-weather')
const unHideFutureForecast = document.getElementById('future-forecast')

let searchedCities = JSON.parse(localStorage.getItem('searchedCity')) || [];

function checkSavedCities() {

    if (searchedCities != null) {

        for (var i = 0; i < searchedCities.length; i++)

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
    });
};

function getWeather(city) {

    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a722e2d1b2d21dd16ce18dcdbac1679d"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                getLongLat(city)

                unHideFutureForecast.classList.remove('hidden-class')
                unHideCurrentWeather.classList.remove('hidden-class')

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

                    if (searchButton.textContent === "") {

                        searchButton.textContent = city

                        unHideSearchBtn.classList.remove('hidden-class')
                        return false;

                    } else {
                        searchButton[i + 1]
                    }
                }
            })
        }
    })
}

function cityButton() {

    for (var i = 0; i < 5; i++) {

        let searchButton = document.getElementById('search' + (i + 1));

        searchButton.addEventListener('click', function () {

            let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchButton.textContent + "&units=imperial&appid=a722e2d1b2d21dd16ce18dcdbac1679d";

            fetch(apiUrl).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        getLongLat(searchButton.textContent)

                        currentLocation.textContent = (data.city.name)
                        currentDate.textContent = (new Date(data.list[0].dt_txt).toDateString())
                        currentTemp.textContent = (data.list[0].main.temp)
                        currentHumidity.textContent = (data.list[0].main.humidity)
                        currentWind.textContent = (data.list[0].wind.speed)

                        for (var i = 1, f = 0; i < 40, f < 5; i += 7, f++) {

                            let futureDate = document.getElementById('future-date' + (f + 1))
                            let futureTemp = document.getElementById('future-temp' + (f + 1))
                            let futureHumid = document.getElementById('future-humidity' + (f + 1))
                            let futureWind = document.getElementById('future-wind' + (f + 1))

                            futureDate.textContent = (new Date(data.list[i].dt_txt).toDateString());
                            futureTemp.textContent = (data.list[i].main.temp);
                            futureHumid.textContent = (data.list[i].main.humidity)
                            futureWind.textContent = (data.list[i].wind.speed);
                        }
                    })
                }
            })
        })
    }
}

function getLongLat(city, searchButton) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a722e2d1b2d21dd16ce18dcdbac1679d"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                let cityLong = data.coord.lon;
                let cityLat = data.coord.lat;

                getUV(cityLat, cityLong)
            })
        }
    })
}

function getUV(cityLat, cityLong) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?daily&exclude=hourly,minutely&lat=" + cityLat + "&lon=" + cityLong + "&appid=a722e2d1b2d21dd16ce18dcdbac1679d"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                for (var i = 1, f = 0; i < data.length, f < 5; i++, f++) {

                    let currentUV = document.getElementById('current-uv')
                    let currentIcon = document.getElementById('current-icon')

                    let futureUV = document.getElementById('future-UV' + (f + 1))
                    let futureIcon = document.getElementById('image' + (f + 1))

                    currentUV.textContent = data.current.uvi;
                    currentIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

                    futureIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png")
                    futureUV.textContent = data.daily[i].uvi;

                    let convertUVToNumber = Number(futureUV.textContent)
                    convertUVToNumber *= 100;

                    if (convertUVToNumber < 200) {
                        futureUV.setAttribute('style', 'background: green')
                    } else if (convertUVToNumber < 6 || convertUVToNumber > 3 || convertUVToNumber === 3) {
                        futureUV.setAttribute('style', 'background: yellow')
                    } else if (convertUVToNumber < 7 || convertUVToNumber > 6) {
                        futureUV.setAttribute('style', 'background: orange')
                    } else if (convertUVToNumber < 10 || convertUVToNumber < 8) {
                        futureUV.setAttribute('style', 'background: red')
                    } else if (convertUVToNumber > 11) {
                        futureUV.setAttribute('style', 'background: purple')
                    }
                }
            })
        }
    })
}

cityButton();

enterCity();

onload = checkSavedCities();

