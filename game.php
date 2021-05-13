<?php
    require_once("action/gameAction.php");

    $action = new gameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<link href="css/game.css" rel="stylesheet">
<script src="js/game.js"></script>
<script src="js/Card.js"></script>

<div id="radianceArea">
    <div id="radianceDeck"></div>
    <div id="radianceHand"></div>
    <div id="radianceHealth"></div>
    <div id="radianceMP"></div>
</div>

<div id="playArea">
    <div id="errorBoard"></div>
    <div id="radianceBoard" class="board"></div>
    <div id="knightBoard" class="board"></div>
</div>

<div id="knightArea">
    <div id="info">
        <div id="vitals">
            <div id="health"></div>
            <div id="MP"></div>
        </div>
        <div id="deck"></div>
    </div>
    <div id="hand"></div>
    <div id="other">
        <div id="power">
            <input type="submit" id="btnPower" class="menuBtn" onclick="buttonPressed(this)" value="Hero Power"/>
        </div>
        <div id="endTurn">
            <input type="submit" id="btnEnd" class="menuBtn" onclick="buttonPressed(this)" value="End Turn"/>
        </div>
        <div id="timer" class="coolText"></div>
    </div>
</div>

<input type="submit" id="toggleChat" class="menuBtn" onclick="toggleChat()" value="Toggle chatbox"/>
<div id="chatDiv" class="hidden">
    <iframe style="height:240px;" id="chatbox" 
            src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
    </iframe>
</div>

<?php
    require_once("partial/footer.php");