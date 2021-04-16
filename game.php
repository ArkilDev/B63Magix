<?php
    require_once("action/gameAction.php");

    $action = new gameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<link href="css/game.css" rel="stylesheet">
<script src="js/game.js"></script>

<div id="radianceArea">
    <div id="radianceDeck"></div>
    <div id="radianceHand"></div>
    <div id="radianceHealth"></div>
    <div id="radianceMP"></div>
</div>

<div id="playArea">
    <div id="radianceBoard"></div>
    <div id="knightBoard"></div>
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
            <input type="submit" name="btnPower" class="menuBtn" value="Hero Power"/>
        </div>
        <div id="endTurn">
            <input type="submit" name="btnEnd" class="menuBtn" value="End Turn"/>
        </div>
        <div id="timer"></div>
    </div>
</div>

<?php
    require_once("partial/footer.php");