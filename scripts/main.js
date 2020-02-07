const addFigToTrends = data => {
    const container = document.querySelector('#add-images');
    const figures = document.createElement('figure');
    const images = document.createElement('img');
    container.appendChild(figures);
    figures.appendChild(images);
    images.setAttribute("src", "images/2-hours-finding-error.jpg");
    console.log(container.outerHTML)
}
//addFigToTrends()