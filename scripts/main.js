async function searchFetch(keyword) {
    const url = "https://api.giphy.com/v1/gifs/search?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&q="+keyword+"&limit=24&offset=0&rating=G&lang=en";
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}
function whereIsElement(symbol, name) {
    const elementPosition = document.querySelector(symbol + name).getBoundingClientRect();
    window.scroll(elementPosition.x, elementPosition.y);
}
function userSearch() {
    searchFetch(document.getElementById('search-Input').value).then(function(resp) {
        const oldDiv = document.getElementById('images-selector');
        oldDiv.remove();
        const container = document.getElementById('container-Base');
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'images-container');
        newDiv.setAttribute('id', 'images-selector');
        resp.data.map(gif => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const title = document.createElement("figcaption");
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
    whereIsElement('#', 'trends-Title');
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
    const container = document.getElementById('container-Base');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'images-container');
    newDiv.setAttribute('id', 'images-selector');
    resp.data.map(gif => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const title = document.createElement("figcaption");
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
function numRandom(max, min) {
    let aleatorio = Math.floor((Math.random() * max) + min);
    return aleatorio
}
const myKeywords = ['cat', 'funny', 'love', 'lol', 'kittens', 'jedi', 'ninja', 'baby', 'forever alone'];
let randomKeywords = [];
function myRandomArray() {
    for (let i = 0; i < 4; i++) {
        randomKeywords.push(myKeywords[numRandom(9,0)]);
        i
    }
}
const resultRandomKeywords = myRandomArray()
console.log(randomKeywords)
/*
myKeywords.map(item => {
    searchFetch(item).then(function(resp) {
      console.log(resp)  
    })
})


function myRandomSearch() {
    

    myKeywords.map(item => {
        const container = document.getElementById('first-container-Base')
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'images-container');
        const figure = document.createElement("figure");
        const title = document.createElement("figcaption");        
        const img = document.createElement("img");
        container.appendChild(newDiv);
        newDiv.appendChild(figure);       
        figure.appendChild(img);
        figure.appendChild(title);
        title.setAttribute('class', 'search-title fig-title');
        title.innerHTML = '#' + item;        
        img.setAttribute("src", item.images.fixed_height_downsampled.url);
    })
}
document.querySelector('.go-up').addEventListener('click', function() {
    whereIsElement('.', 'navBar')
} )*/