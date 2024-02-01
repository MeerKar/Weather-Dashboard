# Weather-Dashboard
 

This project is divided in three categories:

## 1. Introduction
   
## 2. Problem
 
## 3. Solution


##   Introduction

This project is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.
Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. For this i have used the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. 
 Using the 5 Day Weather Forecast API, it  need to pass in coordinates instead of just a city name ,with OpenWeatherMap APIs, we could retrieve geographical coordinates of given a city name and using the
localStorage to store any persistent data. 

## Problem:
 To day the weather forecast for 5 day was a bit challenging and also to get the correct weather icon for forecast too .

 
## Solution

Created a weather dashboard with form inputs to search for a city
And  it gives back  with current and future conditions for that city and that city is added to the search history.

My website will give the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
and the future weather conditions that city
Then it gives a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
and when  clicked on a city in the search history
Then again presented with current and future conditions for that city

The 5 day was solved by looping through the each item in the array ,which was showing every 3 hours - 3 hours x 40 items in the array is 120 total hours.  120 divided by 24 hours is 5 days. 
For the weather icon was solved byt giving the correct url and the specifications


## Mock-Up

<img width="1653" alt="image" src="https://github.com/MeerKar/Weather-Dashboard/assets/116701851/2d2a86a2-0701-4d57-b687-0530184a9430">



Deployed URL: https://meerkar.github.io/Weather-Dashboard/
