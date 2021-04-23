<?php
    require_once("action/CommonAction.php");

    class AjaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $info["key"] = $_SESSION["key"];
            $result = parent::callAPI("games/state", $info);

            return compact("result");
        }
    }