(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",registerController);

    function registerController($location, UserService,$rootScope) {
        var vm= this;
        vm.message = null;
        vm.register = register;

        function register(user) {
            vm.message = null;
            if (!user) {
                vm.message = "Please fill in all the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a valid username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a valid Password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords don't match";
                return;
            }
            if (!user.emails) {
                vm.message = "Please provide a valid email";
                return;
            }
            var emails = [];
            emails.push(user.emails);
            user.emails=emails;
            UserService
                .register(user)
                .then(function(response){
                    console.log(response.data);
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        console.log($rootScope.currentUser);
                        $location.url("/profile");
                    }
                });

        }

    }
})();