const addFigToT = data => {
    const divContainer = document.querySelector('#add-images');
    const figures = document.createElement('figure');
    const images = document.createElement('img');
    divContainer.appendChild(figures);
    figures.appendChild(images);
    images.setAttribute("src", "images/2-hours-finding-error.jpg");
}
async function searchTrends() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt&limit=25&rating=G';
    const answer = await fetch(url);
    const data = await answer.json();
    console.log(data.data[0].bitly_gif_url)
    return data
}
const addFigToTrends = data => {
    const trends = searchTrends();
    trends.then(function(resp) {
        console.log(resp)
        const divContainer = document.querySelector('#add-images');
        const figures = document.createElement('figure');
        const images = document.createElement('img');
        divContainer.appendChild(figures);
        figures.appendChild(images);
        images.setAttribute("src", resp.data[0].bitly_gif_url);
    });
}
addFigToTrends() 