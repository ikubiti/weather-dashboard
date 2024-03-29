# weather-dashboard

An app to display the 5-day weather forecast for any city in a dashboard

## Description

This project display the current weather conditions and the 5-day weather forecast for any city in a dashboard to aid the user plan their activities accordingly. The user is presented with an interactive app that allows the user to access previous searched items with one click. It relies on calls to third-party APIs to provide the weather data. The app runs in any modern browser and uses JavaScript to dynamically update the HTML and CSS code. It has a clean and polished, responsive user interface that adapts to multiple screen sizes.

My objectives for this application were based on the following user story and acceptance criteria;

## User Story

```
As a traveler
I want to see the weather outlook for multiple cities
S0 that I can plan a trip accordingly
```

## Acceptance Criteria

-   Given a weather dashboard with form inputs

-   When I search for a city
    Then I am presented with current and future conditions for that city and that city is added to the search history

-   When I view current weather conditions for that city
    Then I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

-   When I view future weather conditions for that city
    Then I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

-   When I click on a city in the search history
    Then I am again presented with current and future conditions for that city

## Additional Features

In addition to acceptance criteria above, the application has additional features to improve the user experience. These extra features include:

-   The application landing page displays the current day's date and time
-   It also displays a snow fall effect animation to mimic the applications purpose
-   It has three input fields rather than one. The first input field accepts the city while two other fields accept the country and state of interest. The two other input fields helps the user to search for cities with the same names by country and state. In the absence of this feature, the user will not be able to view conditions in cities whose name isn't unique.
-   The app supports searching by providing the list of all countries to the user when the country input field gets selected. The user may scroll to select a country or type the country name, the app will automatically match the nearest match to the typed input. The user may scroll to select the desired country if required.
-   The states field acts similarly to the country field but only shows the states associated with the selected country. If the country isn't selected, the list of states is empty.
-   The city input is required however, the two other input fields are optional. The user can provide only the city's name or the city and country or all three inputs for improved search specificity and results.
-   In addition to displaying the city, it displays the city's country and state to improve the user's feedback and aid the user to decide if they got the right city or not.
-   The search feedback presents the current weather details and extras like how the temperature feels like, the minimum and maximum temperature for the 5-day forecast.
-   In addition to saving the user's search history, the app also displays the number of times the user has searched a city. This reduces the search history list while providing the user with useful search statistics.
-   The app has a clear history button to reset the search history.
-   The app provides appropriate detailed error messages to the user.

## Installation

Please visit https://ikubiti.github.io/weather-dashboard/

## Usage

The application starts by presenting a landing page with the current date and time, the search history if present and a snow fall animation.

The image below is the landing page the user gets when they enter the website address. ![Weather Dashboard Landing Page](./assets/images/Landing-Page.png)

The user providing only the city's name to search. ![User enters london in city input field](./assets/images/City-only-Search.png)

The results from searching only by city name. ![App displays weather information for the most popular city by that name](./assets/images/City-only-results.png)

The user attempting to use the country field. ![App displaying all countries](./assets/images/Select-Country.png)

The user attempting to use the states field without providing a country. The states list is empty. ![App present empty list](./assets/images/select-state-empty-country.png)

The user providing a city and country name to search. ![User enters london and United States of America](./assets/images/City-Country-Search.png)

The results from providing city and country ![App presents results for Kentucky, US](./assets/images/City-Country-Results.png)

The user providing a city, country, and state names for a specific location. ![User enters london, United States of America, and West Virginia](./assets/images/City-Country-State-Search.png)

The results from providing city, country, and state data. ![App presents results for london, West Virginia, US](./assets/images/City-Country-State-Result.png)

The user attempting to use previous search history to perform another search. ![User about to click on Kyoto](./assets/images/Use-Search-History.png)

The app presents a new result for the search and increases the number of times the user has searched for Kyoto. ![App presents new results for Kyoto](./assets/images/Search-history-result.png)

The user attempting to perform a search without providing any city's name ![App presents error message](./assets/images/Empty-City.png)

The user providing a non-existent city's name to search. ![App presents an error message](./assets/images/Non-existent-city.png)

The user providing an existing city in a wrong country. ![App presents an error message](./assets/images/Existing-city-wrong-country.png)

The user about to clear the search history. ![User about to click on Clear History button](./assets/images/Clear-History.png)

The app clears all user search history. ![App shows no search history](./assets/images/History-Cleared.png)

## Credits

N/A

## License

Licensed under the [MIT](LICENSE.txt) license.

```

```
