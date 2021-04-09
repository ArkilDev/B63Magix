<?php
    require_once("action/CommonAction.php");

    class loginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            if (isset($_POST["username"])) {
                
                $credentials = [];
                $credentials["username"] = $_POST["username"];
                $credentials["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $credentials);
                if ($result == "INVALID_USERNAME_PASSWORD") {
                    // err
                    //exit;
                }
                else {
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $_SESSION["key"] = $result->key;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    header("location:mainPage.php");
                }
            }

            return [];
        }
    }