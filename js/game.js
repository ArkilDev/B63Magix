let game = [];
let errorList = [];
let cardSelected = null;

window.addEventListener("load", () => {
    setTimeout(state, 1000);

    //Chatbox style
    let styles = {
        fontColor : "#fff",
        backgroundColor : "#1E1E3C",
        fontFamily : "Marcellus",
        fontSize : "20px",
    }

    let chatbox = document.getElementById("chatbox")
    chatbox.style.width = window.innerWidth / 2 + "px";
    chatbox.contentWindow.postMessage(JSON.stringify(styles), "*");
});

const state = () => {
    for(let i = 0; i < errorList.length; ++i) {
        let alive = errorList[i].tick();
        if (!alive) {
            errorList.splice(i, 1);
        }
    }

    fetch("ajax.php", {
        method : "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data == "object") {
            //Only redraw cards if your hand, the board, or the opponent's board has changed
            //to avoid flickering
            //Code is ugly but less than flicker every second ¯\_(ツ)_/¯
            if (JSON.stringify(game["hand"]) != JSON.stringify(data["hand"]) ||
            JSON.stringify(game["board"]) !== JSON.stringify(data["board"]) ||
            JSON.stringify(game["opponent"]["board"]) !== JSON.stringify(data["opponent"]["board"])) {
                game = data;
                repaint();
            }

            let timer = document.getElementById("timer");
            timer.innerHTML = data["remainingTurnTime"];
            
            game = data;
            updateInfo()   
        } else {
            if (data == "LAST_GAME_WON") {
                endEvent("won");
            } else if (data == "LAST_GAME_LOST") {
                endEvent("lost");
            } else if (data != "WAITING") {
                document.location.href = "login.php";
            }
        }
        
        setTimeout(state, 1000);
    })
}

//================================================================================

const endEvent = (outcome) => {
    
    if (document.getElementById("endScreen") == null) {
        document.getElementById("playArea").style.opacity = 0.5;

        let endScreen = document.createElement("div");
        endScreen.id = "endScreen";
        let endText = document.createTextNode("");
        endScreen.classList.add("coolText");
        if (outcome == "won") {
            endText.textContent = "YOU WIN"
            endScreen.classList.add("healthText");
        } else {
            endText.textContent = "YOU LOSE"
            endScreen.classList.add("deckText");
        }
        endScreen.append(endText);
    
        let quitBtnDiv = document.createElement("div");
        quitBtnDiv.id = "quitBtnDiv";
        let quitBtn = document.createElement("button");
        quitBtn.type = "submit";
        quitBtn.className = "menuBtn";
        quitBtn.id = "endBtn";
        quitBtn.textContent = "Back to lobby";
        quitBtn.addEventListener('click', function() { document.location.href = "lobby.php" });
        quitBtnDiv.append(quitBtn);

        endScreen.append(quitBtnDiv);
        document.body.append(endScreen);
    }

}

const updateInfo = () => {
    
    //Turn indicator
    if (game["yourTurn"]) {
        document.getElementById("knightArea").classList.add("turnIndicator");
        document.getElementById("radianceArea").classList.remove("turnIndicator");
    } else {
        document.getElementById("knightArea").classList.remove("turnIndicator");
        document.getElementById("radianceArea").classList.add("turnIndicator");
    }

    //Knight
    let healthContent = document.createElement("div");
    healthContent.classList.add("infoText", "healthText");
    healthContent.append(document.createTextNode(game["hp"]));
    let health = document.getElementById("health");
    health.innerHTML = "";
    health.append(healthContent);

    let mpContent = document.createElement("div");
    mpContent.classList.add("infoText", "mpText");
    mpContent.append(document.createTextNode(game["mp"] + " / " + game["maxMp"]));
    let mp = document.getElementById("MP");
    mp.innerHTML = "";
    mp.append(mpContent);

    let deckContent = document.createElement("div");
    deckContent.classList.add("infoText", "deckText");
    deckContent.append(document.createTextNode(game["remainingCardsCount"]));
    let deck = document.getElementById("deck");
    deck.innerHTML = "";
    deck.append(deckContent);

    //Radiance
    let radHealthContent = document.createElement("div");
    radHealthContent.classList.add("infoText", "healthText");
    radHealthContent.append(document.createTextNode(game["opponent"]["hp"]));
    let radHealth = document.getElementById("radianceHealth");
    radHealth.innerHTML = "";
    radHealth.append(radHealthContent);

    let radMpContent = document.createElement("div");
    radMpContent.classList.add("infoText", "mpText");
    radMpContent.append(document.createTextNode(game["opponent"]["mp"] + " / " + game["maxMp"]));
    let radMP = document.getElementById("radianceMP");
    radMP.innerHTML = "";
    radMP.append(radMpContent);

    let radDeckContent = document.createElement("div");
    radDeckContent.classList.add("infoText", "deckText");
    radDeckContent.append(document.createTextNode(game["opponent"]["remainingCardsCount"]));
    let radDeck = document.getElementById("radianceDeck");
    radDeck.innerHTML = "";
    radDeck.append(radDeckContent);

    //opponent player info
    let infoContainer = document.createElement("div");
    infoContainer.id = "radianceInfoContainer";

    let opponentName = document.createElement("div");
    opponentName.classList.add("radianceInfo", "coolText")
    opponentName.textContent = "Player : " + game["opponent"]["username"];
    infoContainer.append(opponentName);

    let opponentClass = document.createElement("div");
    opponentClass.classList.add("radianceInfo", "coolText")
    opponentClass.textContent = "Class : " + game["opponent"]["heroClass"];
    infoContainer.append(opponentClass);

    let opponentMessage = document.createElement("div");
    opponentMessage.classList.add("radianceInfo", "coolText")
    opponentMessage.textContent = "\"" + game["opponent"]["welcomeText"] + "\"";
    infoContainer.append(opponentMessage);
    radMP.append(infoContainer);

    let powerButton = document.getElementById("btnPower");
    if (game["heroPowerAlreadyUsed"]) {
        powerButton.classList.remove("heroPowerUnused");
    } else {
        powerButton.classList.add("heroPowerUnused");
    }
}

const repaint = () => {
    //Knight Hand
    let hand = document.getElementById("hand");
    hand.innerHTML = ""

    game["hand"].forEach(cardInfo => {
        let card = new Card(cardInfo).getCardDiv();

        card.addEventListener('mouseover', cardHover, true);
        card.addEventListener('mouseout', cardHover, true);

        let params = new FormData();
        params.append("type", "PLAY");
        params.append("uid", cardInfo["uid"]);
        card.addEventListener('click', function() { cardPlay(params); });

        hand.append(card);
    });

    //Knight Board
    let knightBoard = document.getElementById("knightBoard");
    knightBoard.innerHTML = ""

    game["board"].forEach(cardInfo => {
        let card = new Card(cardInfo).getCardDiv();

        cardInfo["state"] == "IDLE" ? card.classList.add("unusedCard") : card.classList.remove("unusedCard");

        card.addEventListener('mouseover', cardHover, true);
        card.addEventListener('mouseout', cardHover, true);
        card.addEventListener('click', function() { selectCard(cardInfo["uid"]); });
        knightBoard.append(card);
    });

    //Radiance Hand
    let radHand = document.getElementById("radianceHand");
    radHand.innerHTML = "";
    for(let i = 0; i < game["opponent"]["handSize"]; ++i) {
        let radHandCard = document.createElement("div"); 
        radHandCard.className = "radianceHandCard";
        radHand.append(radHandCard)
    }

    //Radiance Board
    let radianceBoard = document.getElementById("radianceBoard");
    radianceBoard.innerHTML = ""

    game["opponent"]["board"].forEach(cardInfo => {
        let card = new Card(cardInfo).getCardDiv();

        cardInfo["mechanics"] == "IDLE" ? card.classList.add("unusedCard") : card.classList.remove("unusedCard");

        card.addEventListener('mouseover', cardHover, true);
        card.addEventListener('mouseout', cardHover, true);
        card.addEventListener('click', function() { attackOpponent(cardInfo["uid"]); });
        radianceBoard.append(card);
    });

    //Radiance attack
    let opponentAtk = document.getElementById("radianceHealth");
    opponentAtk.addEventListener('click', function() { attackOpponent(0); });
}

//================================================================================

//Card actions
const cardPlay = (params) => {
    fetch("ajax.php", {
        method : "POST",
        credentials: "include",
        body: params
    })
    .then(response => response.json())
    .then(data => {
        if(typeof data !== "object") {
            errorList.unshift(new errorText(data));
            redrawErrorList();
        }
    });
}

const attackOpponent = (uid) => {
    if (cardSelected != null) {
        let x = new FormData();
        x.append("type", "ATTACK");     Attack
        x.append("uid", cardSelected);
        x.append("targetuid", uid);
        cardSelected = null;

        fetch("ajax.php", {
            method : "POST",
            credentials: "include",
            body: x
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data !== "object") {
                errorList.unshift(new errorText(data));
                redrawErrorList();
            }
        });
    }
}

const selectCard = (uid) => {
    cardSelected = uid;
}

const cardHover = (e) => {
    e.target.classList.toggle("cardHover");
    e.target.classList.toggle("cardNotHover");
}


//Buttons
const buttonPressed = (e) => {
    let params = new FormData();
    switch(e.id) {
        default: params.append("type", "END_TURN"); break;
        case "btnPower": params.append("type", "HERO_POWER"); break;
    }

    fetch("ajax.php", {
        method : "POST",
        credentials: "include",
        body: params
    })
    .then(response => response.json())
    .then(data => {
        if(typeof data !== "object") {
            errorList.unshift(new errorText(data));
            redrawErrorList();
        }
    });
}

const toggleChat = () => {
    document.getElementById("chatDiv").classList.toggle("hidden");
}

const redrawErrorList = () => {
    //Ensure that the newest error is on top
    document.getElementById("errorBoard").innerHTML = "";
    errorList.forEach(error => {
        console.log("added " + error);
        error.addToDiv();
    });
}

//Showing errors
class errorText {
    constructor(errorMessage) {
        console.log("created error " + errorMessage);
        this.lifespan = 5;
        this.node = document.createElement("div");
        this.node.classList.add("textError");
        this.node.textContent = errorMessage;
    }

    tick() {
        --this.lifespan;
        console.log(this.lifespan);
        if(this.lifespan <= 0) {
            this.node.remove();
            return false;
        }
        return true;
    }

    addToDiv() { document.getElementById("errorBoard").append(this.node); console.log(this.node); }
}