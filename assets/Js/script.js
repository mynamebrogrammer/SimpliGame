var giantUrl = "https://www.giantbomb.com/api/";
var giantKey = "52db97452523e0923604e9bf9b8a29db8a98e07e";
var submit = document.getElementById("search-btn");

function userSubmission(event) {
    event.preventDefault();

    var searchInput = document.getElementById("game-search").value;

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
            generateCards(data);
        }

    });

}
function generateCards(data) {
    var results = data.results;
    for (let i = 0; i < data.results.length; i++) {
        var cardRowEl = document.createElement("div");
        cardRowEl.class = "row";

        var cardContEl = document.createElement("div");
        cardContEl.class = "col offset-m1 m10 custom-background";

        var cardBodyEl = document.createElement("div");
        cardBodyEl.class = "card col offset-m1 m10 custom-card hover"


        var cardTitleEl = document.createElement("h2");
        cardTitleEl.class = "custom-h2 col m12";
        cardTitleEl.textContent = results[i].name;
        cardBodyEl.append(cardTitleEl);

        var cardDescEl = document.createElement("p");
        cardDescEl.class = "col m7";
        
            cardDescEl.textContent = results[i].deck;
        
            //cardDescEl.innerHTML = results[i].description;
        

        cardBodyEl.append(cardDescEl);

        var cardPlatformEl = document.createElement("p");
        cardPlatformEl.class = "col m7";
        cardPlatformEl.textContent = results[i].platforms[0].name;
        cardBodyEl.append(cardPlatformEl);

        // if else for checking if game has a description

        var cardImg = document.createElement("img");

        var searchResultsEl = document.querySelector("#search-results");
        cardContEl.append(cardBodyEl)
        console.log(cardContEl);
        searchResultsEl.append(cardContEl);


        //cardReview.textContent = data.results[i].

    }

}


submit.addEventListener("click", userSubmission);



