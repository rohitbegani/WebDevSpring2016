(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    RegisterController.$inject = ['$scope', '$rootScope', '$location', 'UserService'];

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

        function register(user) {
            UserService.createUser(user,
                function (response) {
                    $rootScope.currentUser = response;
                });
            $location.url("/profile");
        }
    }
})();