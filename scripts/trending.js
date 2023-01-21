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
