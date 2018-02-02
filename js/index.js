window.onload = function () {
    var soundAllowed = function (stream) {
        document.getElementById('h').innerHTML = "What";

        window.persistAudioStream = stream;
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource(stream);
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        analyser.fftSize = 1024;

        var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

        var doDraw = function () {
            requestAnimationFrame(doDraw);
            analyser.getByteFrequencyData(frequencyArray);
            var adjustedLength;
            for (var i = 0; i < 255; i+=5) {
                power = 2*frequencyArray[i];
                resizeText(power);
                console.log(frequencyArray[i]);
            }
        }
        doDraw();
    }

    var soundNotAllowed = function (error) {
        document.getElementById('h').innerHTML = "You must allow your microphone.";
        console.log(error);
    }

    navigator.getUserMedia({
        audio: true
    }, soundAllowed, soundNotAllowed);

    function resizeText(multiplier) {
        document.getElementById('h').style.fontSize = parseFloat(multiplier) + "px";
    }

};