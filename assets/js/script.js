// Get all elements to control
const dateDisplayEl = $('#currentDateTime');
const userInputEl = $('#search-form'); 
const userHistoryEl = $('#search-history'); 
const clearHistoryEl = $('#reset-history'); 
const userCityEl = $('#city-input');
const userStateEl = $('#state-input');
const userCountryEl = $('#country-input');
const mainWeatherEl = $('#main-display');

// Helper variables
const baseCurrent = 'https://api.openweathermap.org/data/2.5/weather?';
const baseForecast = 'https://api.openweathermap.org/data/2.5/forecast/?';
const baseGeocoding = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const apiKey = '75cb5d734e0e171f3edbf0432b44483f';
const baseIcon = 'https://openweathermap.org/img/wn/';
const difference = 24;
const minSearch = 2;
const limit = 2;
const userCity = 'cityName';
const userState = 'cityState';
const userCountry = 'cityCountry';
const userLat = 'latitude';
const userLon = 'longitude';
const snowCount = 250;

let userParams = {};
let choiceParams = {};
let countryCode;
let stateCode;
let currentWeather;
	
// Get search String
let searchString = function () {
	let searchParam = userParams[userCity];
	if (userParams['stateCode']) {
		searchParam +=',' + userParams['stateCode'];
	}

	if (userParams['countryCode']) {
		searchParam +=',' + userParams['countryCode'];		
	}

	searchParam += `&limit=${limit}&appid=${apiKey}`;
	return searchParam;
}

// Get the location of the city and country provided
let getLocationCoordinates = function () {
	// The url for the geocoding api
	let locationUrl = baseGeocoding + searchString();

	fetch(locationUrl)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			
			return response.json();
    })
		.then(function (locationResponse) {
			if (!locationResponse.length) {
				displayErrorMsg()
				return;
			}

			// save the location data
			saveLocationData(locationResponse[0]);
			// get the weather data for the selected location
			getWeatherUpdate();
    })
		.catch(function (error) {
			console.error(error);
    });
};

// Save current search location data
function saveLocationData(locationInfo) {
	userParams[userLat] = locationInfo.lat;
	userParams[userLon] = locationInfo.lon;
	// get country if not provided
	if (!userParams['countryCode']) {
		userParams['countryCode'] = locationInfo.country.toLowerCase();
		userParams[userCountry] = codeCountries[userParams['countryCode']];
	}

	if (!userParams[userState]) {
		userParams[userState] = locationInfo.state;
		if (userParams[userState]) {
			userParams['stateCode'] = subDivisions[userParams['countryCode']][userParams[userState]];
		}
	}
}

// Inform user of wrong selection
function displayErrorMsg() {
	let countryPart = 'in the world';
	if (userParams[userCountry]) {
		countryPart = `in the country: ${userParams[userCountry]}`;
		if (userParams[userState]) {
			countryPart = `in ${userParams[userState]} ${countryPart}`;
		}
	}

	alert(`The city "${userParams[userCity]}" does not exist ${countryPart}!!`);

	// Reset input fields
	resetInputs();
}

// Get the current location weather forecast
let getWeatherUpdate = function () {
	// get the latitude and longitude of the location
	let locationQuery = `lat=${userParams[userLat]}&lon=${userParams[userLon]}&appid=${apiKey}&units=imperial`;

	let validLocUrl = baseCurrent + locationQuery;
	fetch(validLocUrl)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			
			return response.json();
    })
	.then(getWeatherForecast).catch(function (error) {
		console.error(error);
    });
}

// Get the 5 day weather forecast
let getWeatherForecast = function (weatherData) {
	// Save current weather data
	currentWeather = weatherData;
	// get the latitude and longitude of the location
	let locationQuery = `lat=${userParams[userLat]}&lon=${userParams[userLon]}&appid=${apiKey}&units=imperial`;

	let validLocUrl = baseForecast + locationQuery;
	fetch(validLocUrl)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			
			return response.json();
    })
	.then(displayForecast).catch(function (error) {
		console.error(error);
    });
}

// Display the current and 5 day weather forecast
let displayForecast = function (weatherData) {
	// The current weather data
	let displayDate = dayjs.unix(currentWeather.dt).format('MM/DD/YYYY');
	// let presentDate = weatherData.list[0];

	// display the current day's forecast
	let currentCityData = $('#zero');
	currentCityData.empty();
	let headerLine = `${userParams[userCountry]}`;
	if (userParams[userState]) {
		headerLine = `${userParams[userState]} - ${headerLine}`;
	}
	let mainCount = $(`<h3 class="font-boldest">${headerLine}</h3>`);
	currentCityData.append(mainCount);
	let mainDay = $(`<h3 class="font-boldest">${userParams[userCity]} (${displayDate}) <img src="${baseIcon}${currentWeather.weather[0].icon}.png" alt=${currentWeather.weather[0].description}></h3>`);
	currentCityData.append(mainDay);
	currentCityData.append($(`<p>Temp: ${currentWeather.main.temp}°F</p>`));
	currentCityData.append($(`<p>Feels Like: ${currentWeather.main.feels_like}°F</p>`));
	currentCityData.append($(`<p>Min Temp: ${currentWeather.main.temp_min}°F</p>`));
	currentCityData.append($(`<p>Max Temp: ${currentWeather.main.temp_max}°F</p>`));
	currentCityData.append($(`<p>Wind: ${currentWeather.wind.speed} MPH</p>`));
	currentCityData.append($(`<p>Humidity: ${currentWeather.main.humidity}%</p>`));

	let i = 0;
	for (let currentData of weatherData.list) {
		let forecastDate = dayjs.unix(currentData.dt).format('MM/DD/YYYY');
		let dayDifference = dayjs(forecastDate).diff(dayjs(displayDate), 'day');

		if (dayDifference != i) {
			i = dayDifference;
			let forecastDayEL = $(`#day-${i}`);
			forecastDayEL.empty();
			forecastDayEL.append($(`<h3 class="font-bold">${dayjs.unix(currentData.dt).format('MM/DD/YYYY')}</h3>`));
			forecastDayEL.append($(`<img src="${baseIcon}${currentData.weather[0].icon}.png" alt=${currentData.weather[0].description}>`));
			forecastDayEL.append($(`<p>Temp: ${currentData.main.temp}°F</p>`));
			forecastDayEL.append($(`<p>Feels Like: ${currentData.main.feels_like}°F</p>`));
			forecastDayEL.append($(`<p>Wind: ${currentData.wind.speed} MPH</p>`));
			forecastDayEL.append($(`<p>Humidity: ${currentData.main.humidity}%</p>`));
		}
	}

	if(mainWeatherEl.hasClass('d-none')) {
		$('#sub-display').empty();
		$('#sub-display').toggleClass('d-none');
		mainWeatherEl.removeClass('d-none');
		$('style').remove();
	}
	// update search history
	saveSearchHistory();
}

// Save the current search history
function saveSearchHistory() {
	// generate the unique key
	let keyCode = userParams['stateCode'] ? userParams['stateCode'] : userParams['countryCode'];
	let searchKey = userParams[userCity] + keyCode;
	// remove spaces if any
	searchKey = searchKey.replace(/\s/g, '');

	let userHistory = getData('searchHistory');
	if (!userHistory[searchKey]) {
		userParams['count'] = 0;
		userHistory[searchKey] = userParams;
	}

	userParams['count'] = userHistory[searchKey].count + 1;
	userHistory[searchKey] = userParams;
	saveData('searchHistory', userHistory);
	displaySearchHistory();
}

// Update search history
function displaySearchHistory() {
	let userHistory = getData('searchHistory');
	userHistoryEl.empty();
	// create history elements
	for (let aSearch in userHistory) {
		let savedParams = userHistory[aSearch];
		let addCode = savedParams['stateCode'] ? savedParams['stateCode'] : savedParams['countryCode'];
		let historyItemEl = `<button id=${aSearch} class="btn btn-block mb-3">${savedParams.cityName} (${addCode}) - ${savedParams.count}</button>`
		userHistoryEl.append(historyItemEl);
	}

	// Reset the userInput
	userParams = {};
	// Reset input fields
	resetInputs();
}

// Reset user input fields
function resetInputs() {
	userCityEl.val('');
	userCityEl.attr("placeholder", "Type City name");
	choiceParams['dictionary'] = [];
	choiceParams['choice'] = userCountryEl;
	choiceParams['prompt'] = 'Country';
	createOptionList();

	choiceParams['dictionary'] = [];
	choiceParams['choice'] = userStateEl;
	choiceParams['prompt'] = 'State';			
	createOptionList();
}

// Clear all search history
function resetHistory(event) {
	saveData('searchHistory', {});
	displaySearchHistory();
}

// Get the weather forecast based on the user's search history
function getUserHistory(event) {
	let selectID = event.target.getAttribute('id');
	let userHistory = getData('searchHistory');
	userParams = userHistory[selectID];
	getWeatherUpdate();
}

// Activate the right function on user selection
function getUserActivity(event) {
	let selectID = event.target.getAttribute('id');
	switch (selectID) {		
		case 'country-input':			
			choiceParams['dictionary'] = allCountries;
			choiceParams['choice'] = userCountryEl;
			choiceParams['prompt'] = 'Country';
			createOptionList();
			break;
		
		case 'state-input':
			let dictionary = [];
			userParams['countryCode'] = userCountryEl.val();
			if (userParams['countryCode']) {
				dictionary = subDivisions[userParams['countryCode']];
			}

			choiceParams['dictionary'] = dictionary;
			choiceParams['choice'] = userStateEl;
			choiceParams['prompt'] = 'State';			
			createOptionList();
			break;
		
		default:
            break;
	}
}

// Dynamically create the countries or states for the current search
function createOptionList() {
	let optionList = [];
	let optionSelectEl = choiceParams['choice'];
	let defOption = $(`<option value="" disabled selected>Type/Select a ${choiceParams['prompt']}...</option>`);
	optionSelectEl.empty();
	optionSelectEl.append(defOption);

	let dictionary = choiceParams['dictionary'];
    for (let aChoice in dictionary) {
		optionList.push(aChoice);
		let anOption = $(`<option value=${dictionary[aChoice]}>${aChoice}</option>`);
		optionSelectEl.append(anOption);
	}
}

// Get user search inputs
function getSearchInput(event) {
	event.preventDefault();
	let cityName = userCityEl.val();
	if (!cityName || !cityName.length) {
		alert('Please enter a valid city name.');
		return;
	}

	// capitalize first letters
	userParams[userCity] = cityName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
	

	// All user input
	if (!userParams['countryCode']) {
		userParams['countryCode'] = userCountryEl.val();		
	}

	if (userParams['countryCode']) {
		userParams[userCountry] = userCountryEl[0].options[userCountryEl[0].selectedIndex].text;

		// A valid state code is only possible after selecting a country
		userParams['stateCode'] = userStateEl.val();
		if (userParams[stateCode]) {
			userParams[userState] = userStateEl[0].options[userStateEl[0].selectedIndex].text;
		}
	}

	// Display the weather data
	getLocationCoordinates();
}

// Get the stored data
let getData = function (aKey) {
	return JSON.parse(localStorage.getItem(aKey));
}

// save new data
let saveData = function (aKey, aValue) {
    localStorage.setItem(aKey, JSON.stringify(aValue));
}

// Returns the current unix timestamp
function getNow(){
	return dayjs.unix(dayjs().unix());
}

// Display the current time in the header of the page
function displayTime(){
	var presentTime = getNow();
	// Update the display date & Time
	dateDisplayEl.text(presentTime.format('dddd, MMMM DD, YYYY [at] hh:mm:ss A'));
}

// Landing page screen saver
let makeSnow = function () {
	let snowStyles = document.createElement('style');
	let snowFallsEl = document.querySelector('#snowfall');
	const fromY = -5;

	for (let i = 1; i < snowCount; i++) {
		const fromX = (Math.random() * 98).toFixed(4);
		const snowScale = ((1 + Math.random()) * 0.5).toFixed(4);
		let tempX = (Math.random() * 20).toFixed(4);
		const toX = (Number(tempX) + Number(fromX) > 98) ? Number(fromX) - Number(tempX) : Number(tempX) + Number(fromX);
		const opaque = ((1 + Math.random()) * 0.6).toFixed(4);
	    const timeDuration = Math.floor(Math.random() * 15) + 10;
		const timeDelay = Math.floor(Math.random() * 25) + 10;
		
		const aFrame = `@keyframes snowflake-${i} {
			from {
				left: ${fromX}%;
				top: ${fromY}%;
				transform: scale(${snowScale}, ${snowScale}); }
			to {
				left: ${toX}%;
				top: 100%;
				transform: scale(${snowScale}, ${snowScale}); } 
			}`;
		
		// add the new keyframe and snowflake class
		snowStyles.innerHTML += `\n${aFrame}\n`;
		document.head.appendChild(snowStyles);
		const snowDiv = document.createElement('div');
		snowDiv.className = `snow`;
		snowDiv.style.opacity = `${opaque}`;
		snowDiv.style.animation = `snowflake-${i} ${timeDuration}s -${timeDelay}s linear infinite`;
		snowFallsEl.append(snowDiv);
	}
}

// initiate the application
let init = function () {
	// initialize the search history
	let prevHistory = getData('searchHistory');
	if (!prevHistory) {
		prevHistory = {};
		saveData('searchHistory', prevHistory);
	}

	// Update the search history element
	displaySearchHistory();
	// To initialize the application the weather animation
	makeSnow();
}

// Start the application
init();

// Show the current time of day
setInterval(displayTime, 1000);

// Add event listener for user search inputs
userInputEl.on('focus', '.form-input', getUserActivity);

// add event listener for user search history
userHistoryEl.on('click', '.btn', getUserHistory);

// add event listener to search history
clearHistoryEl.on('click', '.btn', resetHistory);

// event listener for user submission
userInputEl.on('click', '.btn', getSearchInput);