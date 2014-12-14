'use strict';

angular.module('HitchedApp')
    .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
        var currentUser = {};
        if ($cookieStore.get('token')) {
            currentUser = User.get();
        }

        return {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function(user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/auth/local', {
                    email: user.email,
                    password: user.password
                }).
                success(function(data) {
                    $cookieStore.put('token', data.token);
                    currentUser = User.get();
                    deferred.resolve(data);
                    return cb();
                }).
                error(function(err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function() {
                $cookieStore.remove('token');
                currentUser = {};
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function(user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function(data) {
                        $cookieStore.put('token', data.token);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function(err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function(newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({
                    id: currentUser._id
                }, {
                    newPassword: newPassword
                }, function(user) {
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Change email
             *
             * @param  {String}   email
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changeEmail: function(email, callback) {
                var cb = callback || angular.noop;

                return User.changeEmail({
                    id: currentUser._id
                }, {
                    email: email
                }, function(user) {
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            linkGames: function(gameObj, callback) {
                var cb = callback || angular.noop;

                return User.linkGames({
                    id: currentUser._id
                }, {
                    gameObj: gameObj
                }, function(user) {
                    // Add new game id to user game array
                    console.log('adding game id to user game array');
                    currentUser.games.push(gameObj._id);
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            removeGame: function(gameObj, callback) {
                var cb = callback || angular.noop;

                return User.removeGame({
                    id: currentUser._id
                }, { 
                    gameObj: gameObj
                }, function(user) {
                    // Remove game id from user game array
                    console.log('removed game id from user game array');
                    currentUser.games.splice(currentUser.games.indexOf(gameObj._id),1);
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function() {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function() {
                return currentUser.hasOwnProperty('role');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function(cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function() {
                        cb(true);
                    }).catch(function() {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('role')) {
                    cb(true);
                } else {
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function() {
                return currentUser.role === 'admin';
            },

            /**
             * Get auth token
             */
            getToken: function() {
                return $cookieStore.get('token');
            }
        };
    });