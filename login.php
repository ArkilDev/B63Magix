<?php
    require_once("action/loginAction.php");

    $action = new loginAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script src="js/login.js"></script>

<input type="range" id="volume" value="25">

<div id="content">
    <div id="kingBrand"></div>

    <div id=container onmouseover="playAudio()">
        <form action="login.php" method="post">
            <div class="form-label">
                <label for="username">Nom d'usager : </label>
            </div>
            <div class="form-input">
                <input type="text" name="username" id="username" />
            </div>

            <div class="form-label">
                <label for="password">Mot de passe : </label>
            </div>
            <div class="form-input">
                <input type="password" name="password" id="password" />
            </div>
            <input type="Submit" style="display: none" />
        </form>
    </div>
</div>
<canvas id="canvas">

<?php
    require_once("partial/footer.php");