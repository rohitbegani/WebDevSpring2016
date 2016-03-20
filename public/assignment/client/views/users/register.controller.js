(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = function() {
            var user = {};

            user.firstName = "";
            user.lastName = "";
            user.username = $scope.username;
            user.password = $scope.password;
            user.roles = ["student"];
            user.email = $scope.email;

            if ($scope.username === undefined || $scope.password === undefined || $scope.email === undefined) {
                $scope.error = "Please fill in the required fields";
            }
            else if ($scope.password !== $scope.password2) {
                $scope.error = "Passwords must match";
            } else {
                // Check for existing user + email, if none exists we create a new one
                UserService.findUserByUsername(user.username).then(
                    function(response) {
                        var foundUser = response.data;
                        if (foundUser === null) {
                            UserService.createUser(user).then(
                                function(response) {
                                    $rootScope.user = response.data;
                                    $rootScope.loggedIn = true;
                                    $scope.$location.path("/profile");
                                },
                                function(error) {
                                    console.log(error);
                                }
                            );
                        } else {
                            $scope.error = "Useralready exists";
                        }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }
    }
})();

