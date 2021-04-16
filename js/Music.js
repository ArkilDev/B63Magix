class Music {
    //Was supposed to be used more than once but ended up doing otherwise
    //That's why it's a class and not just in login.js
    //oh well

    constructor(songPath, volume) {
        this.isPlaying = false;
        this.vol = volume;

        this.music = new Audio(songPath);
        volume = document.querySelector("#volume");
        volume.addEventListener("change", function(e) {
            music.volume = e.currentTarget.value / 100;
        })
    }

    tryToPlay() {
        //Will show DOMExceptions until the user interacts with something
        music.play();
        music.volume = volume.value / 100;
    }
}

