document.querySelector("#search-box").addEventListener("input", function() {
    debounce(searchMovies, 1000);
});
document.querySelector("#search-box").addEventListener("keydown", function(e) {
    if(e.code == "Enter") 
        searchMovies();
});
document.querySelector("#play-button").addEventListener("click", playTrailer);
var timerId;

async function searchMovies() {
    var search = document.querySelector("#search-box").value;
    if(search == "") {
        document.querySelector("#search-results").textContent = "";
        document.querySelector("#search-status").textContent = "Enter something to search!";
        return;
    }
    var url = `http://www.omdbapi.com/?apikey=b42f3047&s=${search}`;
    try {
        document.querySelector("#search-results").textContent = "";
        document.querySelector("#search-status").textContent = "Loading results..";
        let res = await fetch(url);
        let data = await res.json();
        let searchResults = data.Search;
        if(searchResults == undefined) {
            document.querySelector("#search-status").textContent = "";
            var img = document.createElement("img");
            img.src = "https://www.waterandshark.com/assets/img/icons/noresult.gif";
            img.style.width = "950px";
            document.querySelector("#search-results").append(img);
            document.querySelector("#search-results").style.width = "950px";
            return;
        }
        for(let i = 0; i < searchResults.length; i++) {
            let urlMore = `http://www.omdbapi.com/?apikey=b42f3047&i=${searchResults[i].imdbID}`;
            let resMore = await fetch(urlMore);
            let dataMore = await resMore.json();
            searchResults[i] = dataMore;
            if(i == searchResults.length-1)
               loadResults(searchResults);
        }
    } catch(err) {
        console.log(err);
    }
}

function loadResults(data) {
    var searchResults = document.querySelector("#search-results");
    if(data.length == 1)
        searchResults.style.width = "300px";
    else if(data.length == 2)
        searchResults.style.width = "610px";
    else
        searchResults.style.width = "950px";
    searchResults.textContent = "";
    data.map(function(movie) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        if(movie.Poster == "N/A")
            img.src = "https://user-images.githubusercontent.com/87975437/213919447-13460165-2ab9-4b30-a43e-5a73bcc3f844.png";
        else img.src = movie.Poster;
        var divInner = document.createElement("div");
        var divText = document.createElement("div");
        var h4 = document.createElement("h4");
        h4.textContent = movie.Title;
        var p = document.createElement("p");
        p.textContent = "Released " + movie.Year;
        var pRating = document.createElement("p");
        if(movie.Ratings.length > 0) {
            movie.rate = movie.Ratings[0]['Value'];
        pRating.textContent = movie.Ratings[0]['Value'];
        var r = movie.Ratings[0]['Value'].split("/");
        if(r[0] > 8.5) {
            var h6 = document.createElement("h6");
            h6.textContent = "RECOMMENDED";
            divText.append(h6, h4, p);
        } else {
            divText.append(h4, p);
        }
        } else {
            divText.append(h4, p);
            movie.rate = "N/A";
            pRating.textContent = "N/A";
        }
    
        divInner.append(divText, pRating);
        div.append(img, divInner);
        div.addEventListener("click", function() {
            showMovie(movie);
        })
        searchResults.append(div);
    });
    document.querySelector("#search-status").textContent = `${data.length} results loaded!`;
}

function showMovie(movie) {
    document.querySelector("body").style.overflow = "hidden";
    var container = document.querySelector("#movie-container");
    container.style.display = "block";
    container.textContent = "";
    var outerDiv = document.createElement("div");
    var img = document.createElement("img");
    if(movie.Poster == "N/A")
            img.src = "https://user-images.githubusercontent.com/87975437/213919447-13460165-2ab9-4b30-a43e-5a73bcc3f844.png";
    else img.src = movie.Poster;
    var h1 = document.createElement("h1");
    h1.textContent = movie.Title;
    var h4 = document.createElement("h4");
    h4.textContent = "IMDb : " + movie.rate;
    var h30 = document.createElement("h3");
    h30.textContent = "Released : " + movie.Released;
    var h31 = document.createElement("h3");
    h31.textContent = "Directed By : " + movie.Director;
    var h3 = document.createElement("h3");
    h3.textContent = "Starring : " + movie.Actors;
    var h32 = document.createElement("h3");
    h32.textContent = "Plot : " + movie.Plot;
    var closeDiv = document.createElement("div");
    closeDiv.textContent = "Close";
    closeDiv.addEventListener("click", function() {
        container.style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
    });
    outerDiv.append(img, h1, h4, h30, h31, h3, h32, closeDiv);
    container.append(outerDiv);
    
}

function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
        func();
    }, delay);
}




var toggle = 1;
function playTrailer() {
    if(toggle == 1) {
        document.querySelector("#home-banner-cover").style.display = "none";
        document.querySelector("#home-banner-trailer").style.display = "block";
        toggle = 0;
    } else {
        document.querySelector("#home-banner-cover").style.display = "block";
        document.querySelector("#home-banner-trailer").style.display = "none";
        toggle = 1;
    }
    
}
