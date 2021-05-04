<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $info = [];
            $info["key"] = $_SESSION["key"];
            $return = ["BLANK"];

            if (isset($_POST["type"])) {
                $info["type"] = $_POST["type"];
                $info["uid"] = isset($_POST["uid"]) ? $_POST["uid"] : 0;
                $info["targetuid"] = isset($_POST["targetuid"]) ? $_POST["targetuid"] : 0;
                $result = parent::callAPI("games/action", $info);
            }
            else {
                $result = parent::callAPI("games/state", $info);
            }
            return compact("result");
        }
    }