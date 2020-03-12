document.querySelector('#start-button').addEventListener('click', callback => {
    //document.querySelector('#uploaded-gifs').setAttribute('class', 'hidden-element');
    //document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
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
    //recorder.destroy();
    //recorder = null;
}
var recorder;
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

document.getElementById('stop-recording-button').onclick = function() {
    //this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};
/*
document.querySelector('#start-button').addEventListener('click', callback => {
    document.querySelector('#uploaded-gifs').setAttribute('class', 'hidden-element');
    document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
    getStreamVideo();
} )
function getStreamVideo() {
    navigator.mediaDevices.getUserMedia({
        audio: false, video: { width: { min: 300, max: 480}
        }
    })
    .then(function(stream) {
        //let video = document.querySelector('#step1-streaming-video');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        }
    })
}
var recorder

    getStreamVideo(function(camera) {
        recorder = RecordRTC(camera, {
            type: 'video',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,   
            onGifRecordingStarted: function() {
                console.log('started')
            },
            onGifPreview: function(gifURL) {
                console.log('started2')
                document.querySelector('#step2-recording-video').src = gifURL;
            }
        })
        recorder.startRecording();
        recorder.camera = camera;
    })
document.querySelector('#start-capture-button').addEventListener('click', callback => {
    getStreamVideo()
    console.log('changes class to show2')
})
let recorder = RecordRTC(stream, {
    type: 'video',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
        console.log('started')
    },
})        
document.querySelector('#start-capture-button').addEventListener('click', startRecording)*/
