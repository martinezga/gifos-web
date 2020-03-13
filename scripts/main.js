async function searchTrends() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&limit=24&rating=G';
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}
function createSomeElements() {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const title = document.createElement("figcaption");
    figure.appendChild(img);
    figure.appendChild(title);
    title.setAttribute('class', 'search-title');
}
const trends = searchTrends();
trends.then(function(resp) {
    const container = document.getElementById('container-Base');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'images-container');
    newDiv.setAttribute('id', 'div-selector');
    resp.data.forEach(gif => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const title = document.createElement("figcaption");
        container.appendChild(newDiv);
        newDiv.appendChild(figure);       
        figure.appendChild(img);
        figure.appendChild(title);
        img.setAttribute("src", gif.images.fixed_height_downsampled.url);     
        title.setAttribute('class', 'search-title');
        title.innerHTML = gif.title; 
    });
});
async function searchFetch(keyword) {
    const url = "https://api.giphy.com/v1/gifs/search?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&q="+keyword+"&limit=24&offset=0&rating=G&lang=en";
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}
function scrollToElement(name) {
    const elementPosition = document.querySelector(name).getBoundingClientRect();
    window.scrollBy(0, elementPosition.y);
}
function userSearch(value) {
    searchFetch(value).then(function(resp) {
        const oldDiv = document.getElementById('div-selector');
        const container = document.getElementById('container-Base');
        const newDiv = document.createElement('div');
        container.replaceChild(newDiv,oldDiv)        
        newDiv.setAttribute('class', 'images-container');
        newDiv.setAttribute('id', 'div-selector');
        resp.data.forEach(gif => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const title = document.createElement("figcaption");
            container.appendChild(newDiv);
            newDiv.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(title);
            img.setAttribute("src", gif.images.fixed_height_downsampled.url);      
            title.setAttribute('class', 'search-title');
            title.innerHTML = gif.title;
        });
    });
    scrollToElement('#trends-Title');
    document.querySelector('#trends-Title').innerHTML = document.querySelector('#search-Input').value;
    saveWordsToLocalStorage();
}
document.getElementById('search-Button').addEventListener("click", function() {
    userSearch(document.getElementById('search-Input').value);
});
document.getElementById('search-Input').addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        userSearch(document.getElementById('search-Input').value);
    }
});
function verifyLocalStorage() {
    const wordsLocalStorage = localStorage.getItem('gifosSearch');
    if (wordsLocalStorage === null) {
        const wordSearchedSet = new Set();
        const wordSearchedSetToJson = JSON.stringify(Array.from(wordSearchedSet));
        localStorage.setItem('gifosSearch', wordSearchedSetToJson)
    } else {
        const container = document.querySelector('.search-sec');
        const oldDivForWordsSearched = document.querySelector('#words-searched');
        const newDivForWordsSearched = document.createElement('div');
        container.replaceChild(newDivForWordsSearched,oldDivForWordsSearched);
        newDivForWordsSearched.setAttribute('id', 'words-searched')
        const wordsLocalStorageArray = JSON.parse(wordsLocalStorage);
        wordsLocalStorageArray.forEach(value => {
            renderWordSearched(value)
        })
    }
}
verifyLocalStorage()
let wordSearchedSet = new Set();
function getLocalStorage() {
    const wordsLocalStorage = localStorage.getItem('gifosSearch');
    const wordsLocalStorageArray = JSON.parse(wordsLocalStorage);
    wordsLocalStorageArray.forEach(value => {
        wordSearchedSet.add(value)
    })
}
function saveWordsToLocalStorage() {
    getLocalStorage();
    wordSearchedSet.add(document.getElementById('search-Input').value);
    verifyLocalStorage();
    renderWordSearched(document.getElementById('search-Input').value);    
    const wordSearchedSetToJson = JSON.stringify(Array.from(wordSearchedSet));
    localStorage.setItem('gifosSearch', wordSearchedSetToJson);
}
function renderWordSearched(word) {
    const container = document.querySelector('#words-searched');
    const divForWordsSearched = document.createElement('div');
    container.appendChild(divForWordsSearched)
    divForWordsSearched.setAttribute('class', 'btn3 space')
    divForWordsSearched.innerHTML = '#' + word
}
function numRandom(max, min) {
    let aleatorio = Math.floor((Math.random() * max) + min);
    return aleatorio
}
const myKeywords = ['cute', 'funny', 'love', 'lol', 'kittens', 'minions', 'cartoon', 'baby', 'star wars'];
let randomKeywords = new Set();
function myRandomSet() {
    for (let i = 0; randomKeywords.size < 4 ; i++) {
        randomKeywords.add(myKeywords[numRandom(9,0)]);
    }
}
const resultRandomKeywords = myRandomSet();
const container = document.getElementById('suggestion-container');
const newDiv = document.createElement('div');
container.appendChild(newDiv);
newDiv.setAttribute('class', 'images-container');
Array.from(randomKeywords).forEach(gif => {
    searchFetch(gif).then(function(resp){
        const figure = document.createElement('figure');
        const title = document.createElement("figcaption");
        const img = document.createElement("img");
        const button = document.createElement('button');
        const icon = document.createElement("img");
        newDiv.appendChild(figure);
        figure.appendChild(title);
        figure.appendChild(img);
        figure.appendChild(button);
        title.innerHTML = '#' + gif;
        title.appendChild(icon);
        title.setAttribute('class', 'search-title');
        icon.setAttribute('src', 'images/close.svg');
        icon.setAttribute('alt', 'Close icon');
        img.setAttribute("src", resp.data[7].images.fixed_height_downsampled.url);
        button.setAttribute('class', 'btn3 btn-moved');
        button.innerHTML = 'More...';
        button.addEventListener('click', function() {
            userSearch(gif);
            document.querySelector('#trends-Title').innerHTML = gif;
        })
    })
})
/*

*/
document.querySelector('.go-up').addEventListener('click', function() {
    scrollToElement('.navBar')
})
document.querySelector('.dropdown-content-base').addEventListener('click', function(){
    document.getElementById('dropdown-content-menu').removeAttribute('class');
    document.getElementById('dropdown-content-menu').setAttribute('class', 'dropdown-show')
})
document.querySelector('#dark-style').addEventListener('click', function(){
    document.querySelector('#main-logo').src = 'images/gifOF_logo_dark.png';
    const searchButtonStyle = document.querySelectorAll('.lila');
    for(let i = 0; i < searchButtonStyle.length; i++) {
        searchButtonStyle[i].removeAttribute('class', 'lila')
        /*searchButtonStyle[i].toggleAttribute()*/
    };
    document.body.setAttribute('class', 'dark-body');
    document.querySelector('#main-body').setAttribute('class', 'dark-body');
    const searchTitleStyle = document.querySelectorAll('.search-title');
    for(let i = 0; i < searchTitleStyle.length; i++) {
        searchTitleStyle[i].setAttribute('class', 'dark-search-title');
    };
})