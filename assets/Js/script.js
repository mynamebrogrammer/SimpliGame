var warningText = document.querySelector('#warning-text')
var submit = document.querySelector("#search-btn");
var searchResultsEl = document.querySelector("#search-results");
var koopaCardEl = document.querySelector('#koopa-victory-img')

var giantUrl = "https://www.giantbomb.com/api/";
var giantKey = "52db97452523e0923604e9bf9b8a29db8a98e07e";

function userSubmission(event) {
    event.preventDefault();

    var searchInput = document.querySelector("#game-search").value;
    if(!searchInput){
        warningText.classList.remove("hidden")
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
            // console.log('done');
        },
        success: function (data) {
            clearPage();
            generateCards(data);
            revealKoopa();
        }
    });
}

function generateCards(data) {
    var results = data.results;
    for (let i = 0; i < data.results.length; i++) {
        var cardRowEl = document.createElement("div");
        cardRowEl.className = 'row';

        var cardContEl = document.createElement("div");
        cardContEl.className = 'col offset-m1 m10 custom-background';

        var cardBodyEl = document.createElement("div");
        cardBodyEl.className = "card col offset-m1 m10 custom-card hover"

        var cardTitleEl = document.createElement("h2");
        cardTitleEl.className = "custom-h2 col m12";
        cardTitleEl.textContent = results[i].name;
        cardBodyEl.append(cardTitleEl);
        
        var cardImg = document.createElement("img");
        //cardImg.setAttribute('src', '**this should be wikipedia path?**');
        // cardImg.setAttribute('alt', 'image of '+results[i].name);
        // cardImg.className = "col m5 custom-img"
        // cardBodyEl.append(cardImg);

        var cardDescEl = document.createElement("p");
        cardDescEl.className = "col m7";
        if(!results[i].deck){
            cardDescEl.innerHTML = "<span class='custom-span'> Uh oh! </span> There's no description for this game..."
        } else {
            cardDescEl.textContent = results[i].deck;
        }
        //cardDescEl.innerHTML = results[i].description;
        
        cardBodyEl.append(cardDescEl);

        var cardPlatformEl = document.createElement("p");
        cardPlatformEl.className = "col m7";
        if(!results[i].platforms[0].name){
            cardPlatformEl.innerHTML = '<span class="custom-span">Platform: </span> N/A'
        } else{
            cardPlatformEl.innerHTML = '<span class="custom-span">Platform: </span>' + results[i].platforms[0].name;
        }
        cardBodyEl.append(cardPlatformEl);

        cardContEl.append(cardBodyEl)
        cardRowEl.append(cardContEl)
        searchResultsEl.append(cardRowEl);
        
        //cardReview.textContent = data.results[i].
    }
}

function revealKoopa(){
    koopaCardEl.classList.remove('hidden');
}

function clearPage() {
    searchResultsEl.textContent = ''
    document.querySelector("#game-search").value = '';
}

submit.addEventListener("click", userSubmission);