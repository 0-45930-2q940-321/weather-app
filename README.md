# weather-app

This weather app will display a 5 day forecast along with the current weather of the current day.

## API Usage
---
1. [Current Weather Data](https://openweathermap.org/current):</br>
Had to fetch data that invovled the location that's being inputed. The data being the longitude and latitude of the location.</br>

2. [One Call API](https://openweathermap.org/api/one-call-api):</br>
Had to fetch data that involved the UV index information and the weather image.</br>

3. [5 Day / 3 Hour Forecast](https://openweathermap.org/forecast5):</br>
Had to fetch data the involved getting weather 5 days from the current weather.</br>


## Conflicts and resolutions
---
### **Issue 1: Getting the future forecast**

Solution: Loop through the hours by incrementing by 8. Because the data goes by 3 hours, 3 x 8 is 24 and there is 24 hours in a day, so it will always be the next day if I increment it by 8

### **Issue 2: UV Depecrated in 5 Day / 3 Hour Forecast**

Solution: I had to get the UV from the One Call API. But in order to do that I had to get the Long and Lat of the locatio. Why? Because the API did not let me search by city. Which gave me Issue 3.

### **Issue 3: Find the Long and Lat of a location.**

Solution: I can fetch the Long and Lat of a city by using the Current Weather Data API. If I put a city name in the query parameter I can get info about the city, but the most important info I can get is the Long and Lat. Which helps me solve Issue 2.

---

## [CLICK HERE for Live Page Link](https://94r0372189547389.github.io/weather-app/)
