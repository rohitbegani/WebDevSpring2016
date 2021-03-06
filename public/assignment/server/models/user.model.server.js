var q = require("q");

module.exports = function(db, mongoose) {
    "use strict";
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        getUsers: getUsers,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById
    };
    return api;


    function findUserByCredentials(credentials) {
        return UserModel.findOne({
            username: credentials.username,
            password: credentials.password
        });
    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        UserModel.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        console.log(userId);
        var deferred = q.defer();
        UserModel.update({_id: userId},
            {
                username:user.username,
                password:user.password,
                firstName:user.firstName,
                lastName:user.lastName,
                emails:user.emails
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log(doc);
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function deleteUserById(id) {
        var deferred = q.defer();
        UserModel.remove({_id: id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};