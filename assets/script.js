

let searchedArr = JSON.parse(localStorage.getItem("recentlySearched")); 

if(searchedArr !== null){
displayWeather(searchedArr[0])  //display last searched foreacast and recently searched list
recentlySearched();
}

function search() {
  let searchValue = document.getElementById('search').value; //get search value
  return getData(searchValue);
}
function recentlySearched () {

  for (let i = 0; i < searchedArr.length; i++) { //display recently searched list
    const button = document.createElement('button');
    button.setAttribute('id', "recent"+i);
    button.setAttribute('class', 'recent-button');
    button.innerHTML = searchedArr[i];
    let searchDiv = document.getElementById('search-panel');
    searchDiv.appendChild(button);
  }
  document.getElementById('search-panel').addEventListener('click', reloadWeatherData);

}
async function getData(c) { //fetch data from api
  let city = c;
  let day=0;
  await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=96b123844ac11982e5a868f668c7dc48&units=metric").then(function(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    document.getElementById('fail-load').innerText="";
    return response;
})
  .then(async (response) => {const data = await response.json();
  let getCity = JSON.parse(JSON.stringify(data));
  let weatherData =JSON.parse(JSON.stringify(getCity.list))
  let cityVar = getCity.city.name;


  for (var i = 0; i < weatherData.length; i+=8) {
    
  cityObj = {                     //store weather data from api to object
    city: getCity.city.name,
    date: weatherData[i].dt_txt,
    temp: weatherData[i].main.temp,
    wind: weatherData[i].wind.speed,
    humidity: weatherData[i].main.humidity,

    main: weatherData[i].weather[0].main,
    description: weatherData[i].weather[0].description,
    icon: weatherData[i].weather[0].icon
  };

  localStorage.setItem(cityVar+day, JSON.stringify(cityObj)); //store into local storage
  day+=1;

  }
  fithday = {
    city: getCity.city.name,
    date: weatherData[weatherData.length-1].dt_txt,  //storing last array elements from weather data api
    temp: weatherData[weatherData.length-1].main.temp,
    wind: weatherData[weatherData.length-1].wind.speed,
    humidity: weatherData[weatherData.length-1].main.humidity,

    main: weatherData[weatherData.length-1].weather[0].main,
    description: weatherData[weatherData.length-1].weather[0].description,
    icon: weatherData[weatherData.length-1].weather[0].icon

  };

  localStorage.setItem(cityVar+5, JSON.stringify(fithday));

if (localStorage.getItem("recentlySearched") == null) {
  localStorage.setItem("recentlySearched", '[]');
}
let searchedData = JSON.parse(localStorage.getItem("recentlySearched"));
//Creating Recently searched list
if(!searchedData.includes(cityVar)) {
  searchedData.unshift(cityVar);
searchedData.splice(4);
let lastElement = searchedData[searchedData.length - 1];

let buttonLength = document.getElementById('search-panel').querySelectorAll('button');

if(buttonLength.length < 4) {
  let lastindex = searchedData.indexOf(lastElement);
const button = document.createElement('button');
    button.setAttribute('id', "recent"+ lastindex);
    button.setAttribute('class', 'recent-button');
    let searchDiv = document.getElementById('search-panel');
    searchDiv.appendChild(button);
}
}


else {
  const index = searchedData.indexOf(cityVar);
  searchedData.splice(index, 1);
  searchedData.splice(0, 0, cityVar);
}


document.getElementById('search-panel').addEventListener('click', reloadWeatherData);
localStorage.setItem("recentlySearched", JSON.stringify(searchedData));


  updateRecent();
  return displayWeather(cityVar);
  
}).catch(function(error) {
  console.log(error);
  document.getElementById('fail-load').innerText = "Could not find city!" +  " " + error; //Display error
});
}

//Display weather data 
function displayWeather(c) {
  if(searchedArr !== null){
  document.getElementById('city-weather-container').style.display = 'flex';

  for(var i = 0; i < 6; i++) {
  document.getElementById('icon'+i).style.visibility="visible";
  }
  document.getElementById('search-header').style.visibility = 'visible';
  document.getElementById('five-day-title').style.visibility = 'visible';
  }

  let cityy = c;
  for (var i = 0; i < 6; i++) {

//setting elements to show fetched data
let data = JSON.parse(localStorage.getItem(cityy+i));
let city = document.getElementById('city-name');
let cal_date = document.getElementById('date'+i);
let temp = document.getElementById('temp'+i);
let wind = document.getElementById('wind'+i);
let humidity = document.getElementById('humidity'+i);
let main = document.getElementById('main'+i);
let description = document.getElementById('description'+i);
let icon = document.getElementById('icon'+i);

  if(data !== null) {
  city.innerText = data.city;
  cal_date.innerText = data.date;
  temp.innerText = "Temperature:" + " " + data.temp + "°C";
  wind.innerText = "Wind:" + " " + data.wind + " " +"m/s";
  humidity.innerText = "Humidity:" + " " + data.humidity + "%";
  main.innerText = data.main;
  description.innerText = data.description;
  icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.icon + '.png')

  document.getElementById('city-weather-container').style.display = 'flex';

  icon.style.visibility="visible";

  document.getElementById('search-header').style.visibility = 'visible';
  document.getElementById('five-day-title').style.visibility = 'visible';
}
}
}
//updates recent button 
function updateRecent() {
  let searchedData = JSON.parse(localStorage.getItem("recentlySearched"));

  for (var i = 0; i < searchedData.length; i ++) {
    let b =  document.getElementById("recent"+i);
    b.innerText = searchedData[i];
  }
}

//displays stored weather data back onto screen
function reloadWeatherData(e) {
  let searchedData = JSON.parse(localStorage.getItem("recentlySearched"));
  if (e.target.nodeName === 'BUTTON') {
    let target = e.target.innerText; 
    const index = searchedData.indexOf(target);
    searchedData.splice(index, 1);
    searchedData.splice(0, 0, target);
    localStorage.setItem("recentlySearched", JSON.stringify(searchedData));


  displayWeather(target);
  updateRecent();
  }
}
document.querySelector('button').addEventListener('click', search);
 