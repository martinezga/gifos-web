const addFigToTrends = data => {
    const divContainer = document.querySelector('#add-images');
    const figures = document.createElement('figure');
    const images = document.createElement('img');
    divContainer.appendChild(figures);
    figures.appendChild(images);
    images.setAttribute("src", "images/2-hours-finding-error.jpg");
}
addFigToTrends()
addFigToTrends()
addFigToTrends()