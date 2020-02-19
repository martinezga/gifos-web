async function searchFetch(keyword) {
    const url = "https://api.giphy.com/v1/gifs/search?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&q="+keyword+"&limit=24&offset=0&rating=G&lang=en";
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}
function userSearch() {
    searchFetch(document.getElementById('search-Input').value).then(function(resp) {
        let oldDiv = document.getElementById('images-selector');
        oldDiv.remove();
        let container = document.getElementById('container-Base')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'images-container')
        newDiv.setAttribute('id', 'images-selector')
        resp.data.map(gif => {
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let title = document.createElement("figcaption");
            container.appendChild(newDiv)
            newDiv.appendChild(figure)    
            figure.appendChild(img);
            figure.appendChild(title);
            img.setAttribute("src", gif.images.fixed_height_downsampled.url);
            //img.src = gif.images.fixed_height.url;        
            title.setAttribute('class', 'search-title fig-title');
            title.innerHTML = gif.title; 
        });
    })
}
document.getElementById('search-Button').addEventListener("click", userSearch);
document.getElementById('search-Input').addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        userSearch();
    }
});
async function searchTrends() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&limit=24&rating=G';
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}
const trends = searchTrends();
trends.then(function(resp) {
    //console.log(resp.data)
    //console.log(resp.data[0].images)
    const container = document.getElementById('container-Base')
    let newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'images-container')
    newDiv.setAttribute('id', 'images-selector')
    resp.data.map(gif => {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let title = document.createElement("figcaption");
        container.appendChild(newDiv);
        newDiv.appendChild(figure);       
        figure.appendChild(img);
        figure.appendChild(title);
        img.setAttribute("src", gif.images.fixed_height_downsampled.url);
        //img.src = gif.images.fixed_height.url;        
        title.setAttribute('class', 'search-title fig-title');
        title.innerHTML = gif.title; 
    });
});