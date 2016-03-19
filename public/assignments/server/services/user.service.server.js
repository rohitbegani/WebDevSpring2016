/**
 * Created by rohitbegani on 3/19/16.
 */
module.exports = function(app, userModel){
    "use strict";

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.get("/api/assignment/user?username=username",findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password",findUserByCredentials);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUserById);

}();
