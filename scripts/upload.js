var recorder;
var dateStarted;
document.querySelector('.dropdown-menu').addEventListener('mouseenter', function(){
    document.getElementById('dropdown-content-menu').setAttribute('class', 'dropdown-show')
})
document.querySelector('.dropdown-menu').addEventListener('mouseleave', function(){
    document.getElementById('dropdown-content-menu').setAttribute('class', 'hidden-element')
})
document.querySelector('#dark-style').addEventListener('click', function(){
    document.querySelector('#main-logo').src = 'images/gifOF_logo_dark.png';
    const searchButtonStyle = document.querySelectorAll('.lila');
    for(let i = 0; i < searchButtonStyle.length; i++) {
        searchButtonStyle[i].style.background = '#EE3EFE'
        searchButtonStyle[i].style.color = '#FFFFFF'
    };
    document.querySelector('#my-gifos-nav-btn').setAttribute('class', 'dark-btn deco-btn')
    document.querySelector('#cancel-button').setAttribute('class', 'dark-btn space')
    document.body.setAttribute('class', 'dark-body');
    document.querySelector('#main-body').setAttribute('class', 'dark-body');
    const searchTitleStyle = document.querySelectorAll('.search-title');
    for(let i = 0; i < searchTitleStyle.length; i++) {
        searchTitleStyle[i].setAttribute('class', 'dark-search-title');
    };
    const searchAnchorsStyle = document.querySelectorAll('a');
    for(let i = 0; i < searchButtonStyle.length; i++) {
        searchAnchorsStyle[i].style.color = '#FFFFFF'
    }

})
document.querySelector('#light-style').addEventListener('click', function() {
    document.querySelector('#main-logo').src = 'images/gifOF_logo.png'
    const darkBackgrounds = document.querySelectorAll('.dark-body');
    for(let i = 0; i < darkBackgrounds.length; i++) {
        darkBackgrounds[i].toggleAttribute('class');
    };
    const searchDarkButtons = document.querySelectorAll('.lila');
    for(let i = 0; i < searchDarkButtons.length; i++) {
        searchDarkButtons[i].toggleAttribute('style')
    };
    const searchDarkTitles = document.querySelectorAll('.dark-search-title');
    for(let i = 0; i < searchDarkTitles.length; i++) {
        searchDarkTitles[i].setAttribute('class', 'search-title')
    }
    const searchDarkAnchors = document.querySelectorAll('a');
    for(let i = 0; i < searchDarkAnchors.length; i++) {
        searchDarkAnchors[i].toggleAttribute('style')
    }
    document.querySelector('#my-gifos-nav-btn').setAttribute('class', 'btn deco-btn')
    document.querySelector('#cancel-button').setAttribute('class', 'btn space')
})
function startStreamingVideo() {
    navigator.mediaDevices.getUserMedia({
        audio: false, 
        video: { 
            width: { min: 240, max: 480},
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
    document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
    document.querySelector('#streaming-camera-step').setAttribute('class','search-sec video-width');
    startStreamingVideo()
})
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({
        audio: false, 
        video: { 
            width: { min: 240, max: 480},
        }
    }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera.');
        console.error(error);
    });
}
function stopRecordingCallback() {
    console.log(recorder.getBlob())
    document.querySelector('#step3-preview-video').src = URL.createObjectURL(recorder.getBlob())
    recorder.camera.stop();
}
async function uploadYourGif() {
    document.querySelector('#previewing-video-step').setAttribute('class', 'hidden-element');
    document.querySelector('#uploading-video-step').setAttribute('class', 'search-sec video-width');
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif')
    //console.log(form.get('file'))
    const uploadURL = 'https://upload.giphy.com/v1/gifs?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt'
    const answerFetch = await fetch(uploadURL, {
        method: 'POST',
        body: form,
    }).then(response => response.json()
    ).then(
        function(sucess) {
            document.querySelector('#uploading-video-step').setAttribute('class', 'hidden-element');
            document.querySelector('#sucessing-upload-step').setAttribute('class','search-sec video-width');
            console.log(sucess.data.id)
            const gifUrlLocalStorage = localStorage.getItem('myGifosId');
            console.log(gifUrlLocalStorage)
            if (gifUrlLocalStorage === null) {
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
                const oldGifosDiv = document.querySelector('#mygifos-container')
                const newGifosDiv = document.createElement('div');
                container.replaceChild(newGifosDiv, oldGifosDiv);
                newGifosDiv.setAttribute('id', 'mygifos-container')
                newGifosDiv.setAttribute('class', 'images-container')
                renderGifUrl(Array.from(gifosUrlSet))
                document.querySelector('#gifo-uploaded-img').setAttribute('src', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                document.querySelector('#copy-url-gifo-btn').addEventListener('click', callback => {
                    const container = document.querySelector('.gifo-created-btns');
                    const auxiliarInput = document.createElement('input');
                    container.appendChild(auxiliarInput);
                    auxiliarInput.setAttribute('value', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                    auxiliarInput.select();
                    document.execCommand("copy");
                    alert("URL copied to clipboard!");
                    container.removeChild(auxiliarInput);
                })
                document.querySelector('#download-gifo-btn').addEventListener('click', callback => {
                    const anchor = document.querySelector('#download-gifo-btn')
                    anchor.setAttribute('download', 'my-Gifo-' + sucess.data.id);
                    anchor.setAttribute('href', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                })
            }
        }
    ).catch(error => {
        alert('Sorry, occur an error uploading your Gifo.')
        console.log(error)
    });
};
function renderGifUrl(array) {
    const gifosDiv = document.querySelector('#mygifos-container');
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
    document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
    document.querySelector('#streaming-camera-step').setAttribute('class', 'hidden-element');
    document.querySelector('#recording-video-step').setAttribute('class','search-sec video-width');
    captureCamera(function(camera) {
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 240,
            onGifRecordingStarted: function() {
                //document.querySelector('#start-timestamp-div').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function(gifURL) {
                document.querySelector('#step2-recording-video').src = gifURL
            },
            timeSlice: 1000,
            onTimeStamp: function(timestamp, timestamps) {
                let duration = (new Date().getTime() - timestamps[0]) / 1000;
                if(duration < 0) return;
                document.querySelector('#start-timestamp-div').innerHTML = 'Recording duration: ' + duration;
            },
            reset: function() {}
        });
        recorder.startRecording();
        dateStarted = new Date().getTime();

        looper()
        
        recorder.camera = camera;
        document.querySelector('#repeat-recording-button').addEventListener('click', recorder.reset)
    });
});
function looper() {
    if(!recorder) {
        return;
    }
    document.querySelector('#start-timestamp-div').innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
    setTimeout(looper, 1000);
}
document.querySelector('#stop-recording-button').addEventListener('click', callback => {
    document.querySelector('#stoped-timestamp-div').innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
    document.querySelector('#recording-video-step').setAttribute('class', 'hidden-element');
    document.querySelector('#previewing-video-step').setAttribute('class','search-sec video-width');
    recorder.stopRecording(stopRecordingCallback);
});
document.querySelector('#repeat-recording-button').addEventListener('click', callback => {
    document.querySelector('#previewing-video-step').setAttribute('class', 'hidden-element');
    document.querySelector('#streaming-camera-step').setAttribute('class','search-sec video-width');
})
function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ':' + min + ':' + sec;
}
document.querySelector('#upload-gif-button').addEventListener('click', callback => {
    uploadYourGif()
})
document.querySelector('#ready-button').addEventListener('click', callback => {
    document.querySelector('#sucessing-upload-step').setAttribute('class', 'hidden-element');
})
document.querySelector('#upload-canceled-button').addEventListener('click', callback => {
    document.querySelector('#uploading-video-step').setAttribute('class', 'hidden-element');
    document.querySelector('#video-explaining-step').setAttribute('class','search-sec video-width');
    recorder.stopRecording();
})
/*document.querySelector('#cancel-button').addEventListener('click', callback => {
    window.location.href = 'index.html'
})
document.querySelector('#copy-url-gifo-btn').addEventListener('click', callback => {
    const variable = 123;
    const container = document.querySelector('.gifo-created-btns')
    const auxiliarInput = document.createElement('input');
    container.appendChild(auxiliarInput);
    auxiliarInput.setAttribute('value', '0hi' + variable + 'hi0')
    auxiliarInput.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
    container.removeChild(auxiliarInput)   
})
document.querySelector('#download-gifo-btn').addEventListener('click', callback => {
    const anchor = document.querySelector('#download-gifo-btn')
    anchor.setAttribute('href', 'images/close.svg');
    anchor.setAttribute('download', 'lalala');
})*/