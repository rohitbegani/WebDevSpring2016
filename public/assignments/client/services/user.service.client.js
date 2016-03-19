(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }
        function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
        }
        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }
        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }
        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }

})();