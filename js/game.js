let game = [];
let cardSelected = null;

window.addEventListener("load", () => {
    setTimeout(state, 1000);
});

const state = () => {
    fetch("ajax.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        
        
        if (data != "WAITING") {
            
            //Only redraw cards if your hand, the board, or the opponent's board has changed
            //to avoid flickering
            //Code is ugly but less than the flicker ¯\_(ツ)_/¯
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
            
        }
        

        setTimeout(state, 1000);
    })
}

//================================================================================

const updateInfo = () => {
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

const cardPlay = (params) => {
    fetch("ajax.php", {
        method : "POST",
        credentials: "include",
        body: params
    })
    .then(response => response.json())
    .then(data => {
        if(typeof data !== "object") {
            console.log(data);
        }
    });
}

const attackOpponent = (uid) => {
    if (cardSelected != null) {
        let x = new FormData();
        x.append("type", "ATTACK");
        x.append("uid", cardSelected);
        x.append("targetuid", uid);
        cardSelected = null;

        for(var pair of x.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }

        fetch("ajax.php", {
            method : "POST",
            credentials: "include",
            body: x
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data !== "object") {
                console.log(data);
            } else {
                console.log("success");
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
            console.log(data);
        }
    });
}