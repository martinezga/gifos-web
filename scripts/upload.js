var recorder;
function startStreamingVideo() {
    navigator.mediaDevices.getUserMedia({
        audio: false, video: { width: { min: 240, max: 480}
        }
    })
    .then(function(stream) {
        let video = document.querySelector('#step1-streaming-video');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        }
    })
}
document.querySelector('#start-button').addEventListener('click', callback => {
    //document.querySelector('#uploaded-gifs').setAttribute('class', 'hidden-element');
    //document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
    startStreamingVideo()
})
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({
        audio: false, video: { width: { min: 240, max: 480}
        }
    }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera.');
        console.error(error);
    });
}
function stopRecordingCallback() {
    //document.querySelector('h1').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
    document.querySelector('#step3-preview-video').src = URL.createObjectURL(recorder.getBlob())
    recorder.camera.stop();
}
async function uploadYourGif() {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif')
    console.log(form.get('file'))
    const uploadURL = 'https://upload.giphy.com/v1/gifs?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt'
    const answerFetch = await fetch(uploadURL, {
        method: 'POST',
        body: form,
    }).then(response => response.json()
    ).then(
        //success => console.log(success);
        function(sucess) {
            console.log(sucess.data.id)
            const gifUrlLocalStorage = localStorage.getItem('myGifosId');
            console.log(gifUrlLocalStorage)
            if (gifUrlLocalStorage === null) {
                /*localStorage.setItem('myGifosId', '[]');
                //localStorage.setItem('myGifosId', '['UStUsA8WruABTHGgm5', 'iiiKOt5MOTHaTRMVLj']');
                let gifosUrlSet = new Set();
                gifosUrlSet.add(sucess.data.id)
                const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));*/
                const gifosUrlArray = [];
                gifosUrlArray.push(sucess.data.id);
                localStorage.setItem('myGifosId', JSON.stringify(gifosUrlArray));
                renderGifUrl(gifosUrlArray);
            } else {
                const gifUrlLocalStorageArray = JSON.parse(gifUrlLocalStorage);
                let gifosUrlSet = new Set();
                gifUrlLocalStorageArray.forEach(value => {
                gifosUrlSet.add(value)
                })
                gifosUrlSet.add(sucess.data.id)
                const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));
                localStorage.setItem('myGifosId', gifosUrlLocalStorageJson);
                const container = document.querySelector('#uploaded-gifs');
                const oldGifosDiv = document.querySelector('.images-container')
                const newGifosDiv = document.createElement('div');
                container.replaceChild(newGifosDiv, oldGifosDiv);
                newGifosDiv.setAttribute('class', 'images-container')
                renderGifUrl(Array.from(gifosUrlSet))
            }
        }
    ).catch(error => console.log(error)
    );
};
function renderGifUrl(array) {
    const gifosDiv = document.querySelector('.images-container');
    array.forEach(value => {
        const gifosFigure = document.createElement('figure');
        const gifosImage = document.createElement('img');
        gifosDiv.appendChild(gifosFigure);
        gifosFigure.appendChild(gifosImage);
        gifosImage.setAttribute('src', 'https://media.giphy.com/media/' + value + '/200w_d.gif')
    })
}
function verifyMyGifsLocalStore() {
    const gifUrlLocalStorage = localStorage.getItem('myGifosId');
    if (gifUrlLocalStorage === null) {
        const gifosUrlArray = [];
        localStorage.setItem('myGifosId', gifosUrlArray);
        renderGifUrl(gifosUrlArray);
    } else {     
        const gifUrlLocalStorageArray = JSON.parse(gifUrlLocalStorage);
        let gifosUrlSet = new Set();
        gifUrlLocalStorageArray.forEach(value => {
            gifosUrlSet.add(value)
        })
        const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));
        localStorage.setItem('myGifosId', gifosUrlLocalStorageJson);
        renderGifUrl(Array.from(gifosUrlSet))
    }
}
verifyMyGifsLocalStore()
document.querySelector('#start-capture-button').addEventListener('click', callback => {
    captureCamera(function(camera) {
        //document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 240,
            onGifRecordingStarted: function() {
                //document.querySelector('h1').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function(gifURL) {
                document.querySelector('#step2-recording-video').src = gifURL
                //image.src = gifURL;
            }
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
        //document.getElementById('stop-recording-button').disabled = false;
    });
});
document.querySelector('#stop-recording-button').addEventListener('click', callback => {
    //this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});
document.querySelector('#repeat-recording-button').addEventListener('click', callback => {
    //recorder.destroy();
    //startStreamingVideo()
})
document.querySelector('#upload-gif-button').addEventListener('click', callback => {
    uploadYourGif()
    /*.then(function(resp) {
        console.log(resp.data.id)
        const gifUrlLocalStorage = localStorage.getItem('myGifosIdJson');
        console.log(gifUrlLocalStorage)
        if (gifUrlLocalStorage === null) {
            localStorage.setItem('myGifosIdJson', [])
        } else {
            const gifUrlLocalStorageArray = JSON.parse(gifUrlLocalStorage);
            let gifosUrlSet = new Set();
            gifosUrlSet.add(resp.data.id)
            gifUrlLocalStorageArray.forEach(value => {
            gifosUrlSet.add(value)
            })
            const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));
            localStorage.setItem('myGifosIdJson', gifosUrlLocalStorageJson);
        }
    });    
    uploadYourGif().catch(error => console.log(error)*/
})