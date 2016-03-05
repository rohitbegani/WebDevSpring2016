"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SideBarController", SideBarController)

    function SideBarController($location, $scope) {
        $scope.$location = $location;
    };
})();