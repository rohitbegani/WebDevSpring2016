(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$location'];

    function HeaderController($scope, $rootScope, $location) {
        $scope.logout = logout;
        $scope.location = $location;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/");
        }
    }
})();