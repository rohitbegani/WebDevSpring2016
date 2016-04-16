var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;
    var user;

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/user?username=:username', findUserByUsername);
    app.put('/api/assignment/user/:id', updateUser);
    app.post('/api/assignment/admin/user', isAdmin, createUser);
    app.get('/api/assignment/admin/user', isAdmin, getUsers);
    app.get('/api/assignment/admin/user/:id', isAdmin, findUserById);
    app.delete('/api/assignment/admin/user/:id', isAdmin, deleteUser);
    app.put('/api/assignment/admin/user/:id', isAdmin, updateUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    delete user.password;
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function findUserByCredentials(req, res)
    {
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            var user = userModel.findUserByCredentials(credentials)
                .then(
                    function(doc){
                        req.session.currentUser = doc;
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username)
            .then(
                function(doc) {
                    delete doc.password;
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function getUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );

    }


    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user == null) {
                        return userModel.createUser(newUser)
                            .then(
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        userModel
            .deleteUserById(req.params.id)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req,res,next) {
        if(req.isAuthenticated()) {
            user = req.user;
            if(user.roles.indexOf("admin") > -1) {
                next();
            }
        } else {
            res.send(403);
        }
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['admin'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res)
    {
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

};