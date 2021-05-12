class Card {
    constructor(cardInfo) {
        this.card = document.createElement("div");
        this.card.className = "card";

        this.sprite = document.createElement("div");
        this.sprite.className = "cardSprite";
        this.sprite.classList.add("cardNotHover");

        let tempId = cardInfo["id"]
        if (tempId > 93) {
            tempId = "default"
        }
        this.sprite.style.backgroundImage = "url(/images/inGame/cards/" + tempId + ".png)";

        this.card.append(this.sprite);

        this.infoSection = document.createElement("div");
        this.infoSection.className = "cardInfo";

        this.cardCost = document.createElement("div");
        this.cardCost.append(document.createTextNode("cost : " + cardInfo["cost"]));
        this.infoSection.append(this.cardCost);

        this.cardHp = document.createElement("div");
        this.cardHp.append(document.createTextNode("hp : " + cardInfo["hp"]));
        this.infoSection.append(this.cardHp);

        this.cardAtk = document.createElement("div");
        this.cardAtk.append(document.createTextNode("atk : " + cardInfo["atk"]));
        this.infoSection.append(this.cardAtk);

        this.cardMech = document.createElement("div");
        if (cardInfo["mechanics"] != []) {
            cardInfo["mechanics"].forEach(mechanic => {
                this.cardMech.append(document.createTextNode(mechanic));
                
                if (mechanic == "Taunt") { this.card.classList.add("tauntCard"); console.log("card is taunt"); }
                if (mechanic == "Charge") { this.card.classList.add("chargeCard"); console.log("card is charge"); }
                if (mechanic == "Deathrattle") { this.card.classList.add("deathrattleCard"); console.log("card is deathrattle"); }
                
                //Add comma if not last mechanic
                if (mechanic != cardInfo["mechanics"].slice(-1)) {
                    this.cardMech.append(document.createTextNode(", "));
                }

            });
        }
        this.infoSection.append(this.cardMech);
        this.card.append(this.infoSection);
    }

    getCardDiv() {
        return this.card
    }
}