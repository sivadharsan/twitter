//inject the twitterService into the controller
app.controller('TwitterController', function($scope, $q, twitterService) {

    $scope.tweet;

    $scope.tweets;

    $scope.followers;

    twitterService.initialize();

    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
            twitterService.getFollowersList().then(function(follwersList) {
                $scope.followers = follwersList;
            });
        });
    }

    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                });
            }
        });
    }

    $scope.submit = function(){
        var tweet = $scope.tweets[0];
        tweet.text = $scope.tweet;
        tweet.user.name = "me";
        $scope.tweets.push(tweet);
        twitterService.updateStatus($scope.tweet).then(function(data) {
        });
    }

    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $scope.followers.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    }

    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.refreshTimeline();
    }

});