let canevas = null;
let ctx = null;

let song;

let spriteList = [];
let rate = 0;
let timer = 0;

window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-4; //make height slightly smaller to avoid scrollbar
    ctx = canvas.getContext("2d");

    song = new Audio("music/HollowKnight-WhitePalace.mp3");
    document.getElementById("volume").addEventListener("change", function(e) {
        song.volume = e.currentTarget.value / 100;
    })

    tick(); 
});

const playAudio = () => {
    song.play();
    song.volume = document.getElementById("volume").value / 100;;
}

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (timer >= rate) {
        spriteList.push(new Drop());
        timer = 0;
        rate = Math.random() * 50;
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
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.size = Math.floor(Math.random() * 10 + 8);
        this.spd = 1;
        this.direction = [this.randInt(2), this.randInt(2)];
        this.life = Math.random() * 100 + 100;
        this.rainbow = Math.floor(Math.random()*4);
    }

    tick() {
        //make particle look noice
        ctx.fillStyle = "rgba(255, 255, 255, 255)";
        ctx.fillRect(-20, -20, this.size, this.size);

        if (this.rainbow >= 3) {
            ctx.shadowColor = "rgba(" + this.randInt(255) + "," + this.randInt(255) + "," +this.randInt(255) + "255)";
        } else {
            ctx.shadowColor = "rgba(255,255,255,255)";
        }

        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = this.x;
        ctx.shadowOffsetY = this.y;


        //Get new direction 1/4 of the time
        switch(Math.floor(Math.random() * 4)) {
            case 3: this.direction = [this.randInt(2), this.randInt(2)];
            default: 
                //new direction inclues +/- x, +/- y, or nothing for both
                switch(this.direction[0]) {
                    case 0: this.x += this.spd; break;
                    case 1: this.x -= this.spd; break;
                    default: /*Do nothing*/ break;
                }

                switch(this.direction[1]) {
                    case 0: this.y += this.spd; break;
                    case 1: this.y -= this.spd; break;
                    default: /*Do nothing*/ break;
                }
                break;
        }
    
        this.spd = Math.random() * 15;
        --this.life;
    }

    randInt(x) {
        return Math.floor(Math.random() * x);
    }

    getPos() { 
        let pos = [this.x, this.y];
        return pos;
    }

    getLife() { return this.life; }
}