async function loadTrending(){
    try{
        let res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=d5e74a00df86cc17925a9f779c2e9e24`);
        let data = await res.json()
        console.log(data.results);
        showTrending(data.results)
    }catch(err){
        console.error(err)
    }
    
}

loadTrending()

function showTrending(results){
    document.querySelector("#trending-container").textContent = "";
    results.forEach(function(trending) {
        var outerDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/original/" + trending.backdrop_path;
        var innerDiv = document.createElement("div");
        var h5 = document.createElement("h5");
        h5.textContent = trending.media_type;
        var h2 = document.createElement("h2");
        if(trending.name){
            h2.textContent = trending.name;
        }
        else{
            h2.textContent = trending.original_title
        }
        var h6 = document.createElement("div");
        if(trending.vote_count == 0){
            h6.textContent = "N/A";
        }
        else{
            h6.textContent = trending.vote_average  + " from " + trending.vote_count + " votes";
        }
        var p = document.createElement("p");
        p.textContent = trending.overview;
        innerDiv.append(h5, h2, h6, p);
        outerDiv.append(img, innerDiv);
        document.querySelector("#trending-container").append(outerDiv);
    });
}