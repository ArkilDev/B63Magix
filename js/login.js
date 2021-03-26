let canevas = null;
let ctx = null;

let music;
let volume;

let spriteList = [];
let rate = 0;
let timer = 0;

window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-4; //make height slightly smaller to avoid scrollbar
    ctx = canvas.getContext("2d");

    music = new Audio("music/HollowKnight-WhitePalace.mp3");

    volume = document.querySelector("#volume");
    volume.addEventListener("change", function(e) {
        music.volume = e.currentTarget.value / 100;
    })

    tick(); 
});

const playAudio = () => {
    //Will show DOMExceptions until the user interacts with something
    music.play();
    music.volume = volume.value / 100;
}

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (timer >= rate) {
        spriteList.push(new Drop());
        timer = 0;
        rate = Math.random() * 100;
    }

    spriteList.forEach(drop => {
        drop.tick();

        //delete drop if OOB
        let pos = drop.getPos()
        if (pos[0] >= canvas.width || 
            pos[0] <= 0 ||
            pos[1] >= canvas.height ||
            pos[1] <= 0) {
            spriteList.splice(spriteList.indexOf(drop), 1);
        }

        if (drop.getLife() == 0) {
            spriteList.splice(spriteList.indexOf(drop), 1);
        }

    });

    ++timer;
    window.requestAnimationFrame(tick);
}

class Drop {
    constructor(width) {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.size = Math.floor(Math.random() * 5 + 5);
        this.spd = Math.random() * 5;
        this.direction = Math.floor(Math.random() * 2);
        this.alpha = Math.random();
        this.life = Math.random() * 1000 + 100;
    }

    tick() {
        ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        
        switch(Math.floor(Math.random() * 4)) {
            default: 
                switch(this.direction) {
                    case 0: this.x += this.spd; break;
                    case 1: this.y += this.spd; break;
                    case 2: this.x -= this.spd; break;
                    case 3: this.y -= this.spd; break;
                }
                break;
            case 3: this.direction = Math.floor(Math.random() * 4); break;
        }
    
        this.spd = Math.random() * 15;
        --this.life;
    }

    getPos() { 
        let pos = [this.x, this.y];
        return pos;
    }

    getLife() { return this.life; }
}