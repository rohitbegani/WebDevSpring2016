(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .otherwise({
                redirectTo: "/"
            })
    }
})();