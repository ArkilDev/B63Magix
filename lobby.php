<?php
    require_once("action/lobbyAction.php");

    $action = new lobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<link href="css/lobby.css" rel="stylesheet">
<script src="js/lobby.js"></script>
<script src="js/TiledImage.js"></script>
<script src="js/sprite/Vengefly.js"></script>

<canvas id="canvas"></canvas>
<div id="chatDiv">
    <iframe style="height:240px;" id="chatbox" 
            src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
    </iframe>
</div>

<?php
    require_once("partial/footer.php");