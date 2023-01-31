var warningText = document.querySelector('#warning-text')
var submit = document.querySelector("#search-btn");
var searchResultsEl = document.querySelector("#search-results");
var koopaCardEl = document.querySelector('#koopa-victory-img')
var weatherDiv = document.querySelector('#weather-show')
var weatherNowSpan = document.querySelector('#weather-now')
var tempNowSpan = document.querySelector('#temp-now')
var feelsNowSpan = document.querySelector('#feels-now')

var finalResults = ''
var giantUrl = 'https://www.giantbomb.com/api/';
var giantKey = '52db97452523e0923604e9bf9b8a29db8a98e07e';

function userSubmission(event) {
    event.preventDefault();

    var searchInput = document.querySelector('#game-search').value;
    if(!searchInput){
        warningText.classList.remove('hidden')
        return;
    }else{
        warningText.className = 'hidden'
    }

    // this API only works with JQUERY...sigh
    // tried fetch()... did not work

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: giantUrl + "search?api_key=" + giantKey + '&format=jsonp&query="' + searchInput + '"&resources=game',
        complete: function () {
        },
        success: function (data) {
            finalResults = data.results
            hideWeather();
            clearPage();
            generateCards(data);
            revealKoopa();
        }
    });

}


function generateCards(data) {
    var results = data.results;
    for (let i = 0; i < results.length; i++) {
        var cardRowEl = document.createElement('div');
        cardRowEl.className = 'row';
        
        
        var cardContEl = document.createElement('div');
        cardContEl.className = 'col offset-m1 m10 custom-background';
        
        var cardBodyEl = document.createElement("div");
        cardBodyEl.className = 'card col offset-m1 m10 custom-card hover'
        cardBodyEl.setAttribute('id', 'card-body')

        var cardTitleEl = document.createElement('h2');
        cardTitleEl.className = 'custom-h2 col m12';
        cardTitleEl.textContent = results[i].name;
        cardBodyEl.append(cardTitleEl);
        
        var cardImg = document.createElement('img');
        cardImg.setAttribute('src', results[i].image.original_url);
        cardImg.setAttribute('alt', 'image of '+results[i].name);
        cardImg.className = 'col m5 custom-img'
        cardBodyEl.append(cardImg);
        
        var cardDescEl = document.createElement('p');
        cardDescEl.className = 'col m7';
        if(!results[i].deck){
            cardDescEl.innerHTML = "<span class='custom-span'> Uh oh! </span> There's no description for this game..."
        } else {
            cardDescEl.textContent = results[i].deck;
        }        
        cardBodyEl.append(cardDescEl);
        
        var cardPlatformEl = document.createElement('p');
        cardPlatformEl.className = "col m7";
        if(!results[i].platforms[0].name){
            cardPlatformEl.innerHTML = '<span class="custom-span">Platform: </span> N/A'
        } else{
            cardPlatformEl.innerHTML = '<span class="custom-span">Platform: </span>' + results[i].platforms[0].name;
        }
        cardBodyEl.append(cardPlatformEl);

        var cardReviewEl = document.createElement('a'); 
        cardReviewEl.className = 'col m7 custom-link';
        cardReviewEl.textContent = 'Review'
        var siteDetailUrl = results[i].site_detail_url;
        cardReviewEl.setAttribute('href', siteDetailUrl+'user-reviews/');
        cardBodyEl.append(cardReviewEl);
        
        cardContEl.append(cardBodyEl)
        cardRowEl.append(cardContEl)
        searchResultsEl.append(cardRowEl);
    }
}
function displayWeather(){
    var apiKey = 'a6e22ff5fd306121b7107074ca75c22a'
    weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=34.0537&lon=-118.2428&units=imperial&appid='+apiKey
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(function(response){
            weatherNowSpan.textContent = response.weather[0].description
            tempNowSpan.textContent = response.main.temp
            feelsNowSpan.textContent = response.main.feels_like
        })
        .catch(err => console.error(err));
}



function revealKoopa(){
    koopaCardEl.classList.remove('hidden');
}

function hideWeather(){
    weatherDiv.className = 'hidden';
}

function clearPage() {
    searchResultsEl.textContent = ''
    document.querySelector('#game-search').value = '';
}

submit.addEventListener('click', userSubmission);

displayWeather();