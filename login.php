<?php
    require_once("action/loginAction.php");

    $action = new loginAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<div id=loginForm> 
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
    </form>
</div>

<canvas id="canvas">

<?php
    require_once("partial/footer.php");