let canevas;
let ctx = null;
const TIMERCAP = 500; 
let timer = TIMERCAP;
let spriteList = [];


window.addEventListener("load", () => {
    canevas = document.getElementById("canvas")
    ctx = canevas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-4;

	spriteList.push(new Vengefly());

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
    --timer;

    if (timer <= 0) {
        spriteList.push(new Vengefly());
        timer = Math.random() * TIMERCAP;
    }

    ctx.clearRect(0, 0, canevas.width, canevas.height);
    for (let i = 0; i < spriteList.length; ++i) {
        let alive = spriteList[i].tick();

		if (!alive) {
			spriteList.splice(i, 1);
			i--;
		}
    }

    window.requestAnimationFrame(tick);
}

document.onkeydown = e => {
    if (e.key == "ArrowLeft")
        spriteList.push(new Vengefly());
}