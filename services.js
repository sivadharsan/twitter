angular.module('twitterApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            OAuth.initialize('e6u0TKccWPGCnAqheXQYg76Vf2M', {cache:true});
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) {
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function () {
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) {
                deferred.resolve(data)
            });
            return deferred.promise;
        },
        getFollowersList: function () {
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/followers/list.json').done(function(data) {
                deferred.resolve(data)
            });
            return deferred.promise;
        },
        updateStatus: function (status) {
            var deferred = $q.defer();
            var promise = authorizationResult.post('/1.1/statuses/update.json?status='+ status).done(function(data) {
                deferred.resolve(data)
            });
            return deferred.promise;
        }
    }

});