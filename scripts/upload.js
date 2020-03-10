document.querySelector('#start-button').addEventListener('click', callback => {
    document.querySelector('#uploaded-gifs').setAttribute('class', 'hidden-element');
    document.querySelector('#video-explaining-step').setAttribute('class', 'hidden-element');
    getStreamAndRecord();
} )
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false, video: { width: { min: 300, max: 480}
        }
    })
    .then(function(stream) {
        const video = document.querySelector('#video-tag');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        }
    })   
}
/*function RecordRTC(stream, {
    type: 'video',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
        console.log('started')
    },
})*/