let canevas;
let ctx = null;
const TIMERCAP = 300; 
let timerSprite = TIMERCAP;
let timerText = TIMERCAP
let spriteList = [];
let nodeList = [];


window.addEventListener("load", () => {
    canevas = document.getElementById("canvas")
    ctx = canevas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-4;

    nodeList.push(new TextNode());

    let styles = {
        fontColor : "#fff",
        backgroundColor : "#1E1E3C",
        fontFamily : "Marcellus",
        fontSize : "20px",
    }

    let chatbox = document.getElementById("chatbox")
    chatbox.style.width = window.innerWidth / 2 + "px";
    chatbox.contentWindow.postMessage(JSON.stringify(styles), "*");

    tick();
});

const tick = () => {
    --timerSprite;
    --timerText;

    if (timerSprite <= 0) {
        spriteList.push(new FlyingSprite(Math.floor(Math.random()*3)));
        timerSprite = Math.random() * TIMERCAP + 50;
    }

    if (timerText <= 0) {
        nodeList.push(new TextNode());
        timerText = Math.random() * TIMERCAP / 2 + 200;
    }

    ctx.clearRect(0, 0, canevas.width, canevas.height);
    for (let i = 0; i < spriteList.length; ++i) {
        let alive = spriteList[i].tick();

		if (!alive) {
			spriteList.splice(i, 1);
			--i;
		}
    }

    for (let i = 0; i < nodeList.length; ++i) {
        let alive = nodeList[i].tick();
        if (!alive) {
            nodeList.splice(i, 1);
            --i;
        }
    }

    window.requestAnimationFrame(tick);
}

//Test stuff
document.onkeydown = e => {
    if (e.key == "ArrowLeft")
        spriteList.push(new FlyingSprite(Math.floor(Math.random()*3)));
}

class TextNode {
    constructor() {
        this.node = document.createElement("div");
        this.node.className = "randText";
        this.textNode;

        this.lifespan = Math.random()*150 + 50;

        this.index = Math.floor(Math.random() * 10);
        this.text;
        this.x = window.innerWidth / 2 + 200 - (Math.random() * 200 + 250);
        this.y = window.innerHeight / 2 + 100 - (Math.random() * 100 + 200);

        switch(this.index) {
            default: this.text = "this is nice..."; break;
            case 1: this.text = "No cost too great"; break;
            case 2: this.text = "Shaw"; break;
            case 3: this.text = "damn it's far"; break;
            case 4: this.text = "Wait was that an aspid?"; break;
            case 5: this.text = "How do you play Magix again?"; break;
            case 6: this.text = "I can't read..."; break;
            case 7: this.text = "I'll bet all my geo on Quirrel"; break;
            case 8: this.text = "Should I equip shaman stone for this?"; break;
            case 9: this.text = "God I hope Zote won't come"; break;
        }

        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";

        this.textNode = document.createTextNode(this.text); 
        this.node.append(this.textNode);
        document.body.append(this.node);
    }

    tick() {
        --this.lifespan;

        if (this.index == 1) {
            this.x += Math.random() * 10 - 5;
            this.y += Math.random() * 10 - 5;

            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
        }

        if(this.lifespan <= 0) {
            this.node.remove();
            return false;
        }

        return true;
    }
}