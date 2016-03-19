/**
 * Created by rohitbegani on 3/18/16.
 */
module.exports = function(){
    "use strict";
    var api = {
        findUserByUsername: findUserbyUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers
    };

    return api;
}();