<?php
    require_once("action/CommonAction.php");

    class lobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            $info["key"] = $_SESSION["key"];

            //AI game
            if(array_key_exists('btnAI', $_POST)) {
                $info["type"] = "TRAINING";
                $result = parent::callAPI("games/auto-match", $info);
                if ($result == "JOINED_TRAINING") {
                    header("location:game.php");
                } else {
                    var_dump($result);
                }
            } 
            
            //PVP game
            else if (array_key_exists('btnPlayer', $_POST)) {
                $info["type"] = "PVP";
                $result = parent::callAPI("games/auto-match", $info);
                if ($result == "JOINED_PVP" || $result == "CREATED_PVP") {
                    header("location:game.php");
                } else {
                    var_dump($result);
                }
            } 
            
            //Quit
            else if (array_key_exists('btnQuit', $_POST)) {
                $result = parent::callAPI("signout", $info);

                if ($result == "SIGNED_OUT") {
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
                }
                header("location:login.php");
            }

            return [];
        }
    }