let cardList = [];

window.addEventListener("load", () => {
    setTimeout(state, 1000);

    tick();
});

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data); // contient les cartes/état du jeu.
        
        if (data != "WAITING") {
            if (JSON.stringify(cardList) != JSON.stringify(data["hand"])) {
                cardList = data["hand"];
                redrawHand();
            }
        }

        setTimeout(state, 1000);
    })
}

const redrawHand = () => {
    
    let hand = document.getElementById("hand");
    hand.innerHTML = ""

    cardList.forEach(cardInfo => {

        let card = document.createElement("div");
        card.className = "card";

        let sprite = document.createElement("div");
        sprite.className = "cardSprite";
        sprite.style.backgroundImage = "url(/images/inGame/cards/" + cardInfo["id"] + ".png)";
        card.append(sprite);

        let cardCost = document.createElement("div");
        cardCost.append(document.createTextNode("cost : " + cardInfo["cost"]));
        card.append(cardCost);

        let infoSection = document.createElement("div");
        infoSection.className = "cardInfo";

        let cardHp = document.createElement("div");
        cardHp.append(document.createTextNode("hp : " + cardInfo["hp"]));
        infoSection.append(cardHp);

        let cardAtk = document.createElement("div");
        cardAtk.append(document.createTextNode("atk : " + cardInfo["atk"]));
        infoSection.append(cardAtk);

        let cardMech = document.createElement("div");
        if (cardInfo["mechanics"] != []) {
            cardInfo["mechanics"].forEach(mechanic => {
                cardMech.append(document.createTextNode(mechanic));
            });
        }
        infoSection.append(cardMech);

        sprite.addEventListener('mouseover', cardHover, true);
        sprite.addEventListener('mouseout', cardHover, true);

        card.append(infoSection);
        hand.append(card);
    });
}

const cardHover = (e) => {
    e.target.classList.toggle("cardHover");
    console.log("hover");
}

const tick = () => {

    window.requestAnimationFrame(tick);
}

document.onkeydown = e => {
    if (e.key == "ArrowLeft")
        setTimeout(state, 1000);
}
