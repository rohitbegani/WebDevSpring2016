(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'UserService'];

    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.currentUser;

        function update(user) {
            UserService.updateUser(user._id, user,
                function(response) {
                    $rootScope.currentUser = response;
                });
        }
    }
})();