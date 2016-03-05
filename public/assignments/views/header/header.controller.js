(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.logout = logout;
        $scope.location = $location;

        function logout() {
            delete $rootScope.currentUser;
            $location.url("/");
        }
    }
})();