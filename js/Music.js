class Music {
    //Was supposed to be used more than once but ended up doing otherwise
    //That's why it's a class and not just in login.js
    //oh well

    constructor(songPath, volume) {
        this.isPlaying = false;

        this.music = new Audio(songPath);
        document.getElementById("volume").onchange = function() {
            console.log(this.isPlaying);
            if (this.isPlaying) {
                console.log(document.getElementById("volume").value / 100);
                console.log(this.music.volume);
                this.music.volume = document.getElementById("volume").value / 100;
            }
        };
        //volume.addEventListener("change", function(e) { })
    }

    tryToPlay() {
        //Will show DOMExceptions until the user interacts with something
        this.music.play();
        this.music.volume = document.getElementById("volume").value / 100;;
        this.isPlaying = true;
    }
}

