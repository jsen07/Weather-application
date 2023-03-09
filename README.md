# 06 Server-Side APIs: Weather Dashboard

## Project Description
Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. The challenege is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.


## User Story

- AS A traveler
- I WANT to see the weather outlook for multiple cities
- SO THAT I can plan a trip accordingly


## Acceptance Criteria

- GIVEN a weather dashboard with form inputs
- WHEN I search for a city
- THEN I am presented with current and future conditions for that city and that city is added to the search history
- WHEN I view current weather conditions for that city
- THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
- WHEN I view future weather conditions for that city
- THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- WHEN I click on a city in the search history
- THEN I am again presented with current and future conditions for that city

## Languages Used

- HTML
- CSS
- Javascript/node.js

## How to use
[ https://jsen07.github.io/Weather-application/ ] -- Linked to deployed site

To use the application the user inputs a city into the input box which then fetches the weather forecast data from that city from the OpenWeather API. The current day forecast along with a five day forecast will be displayed onto the screen. If the user inputs a city that does not exist in the api, an error will be thrown that is shown and tells the user that the city could not be found. Each time the user searches for a city, it will be stored into a recently searched list that stores all of the users recent searches. When the user leaves the application, the last searched foreacast along with the list of recent searches will persist on the page allowing users to view their last viewed forecast.



## Application
![image](https://user-images.githubusercontent.com/56829664/224166591-52adc169-192a-430a-9b4c-e73199bce509.png)
