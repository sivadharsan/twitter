1. Run index.html
2. Click Connect twitter button
3. Enter twitter details
4. Authorize App
5. You should see the latest tweets by your friends and your friend list.
6. When you click "Tweet" it updates the last tweets with your message ( It is not actual update send to your twitter account)

Notes:
------
         I had issues creating a twitter app, so i used another already created app.
         If you are able to create your own twitter app successfully, you can update the services.js file to use your id.
                     Change this line.
                     OAuth.initialize('your app id here', {cache:true});
         If app creation was successful the updates will be real time, the following line in $scope.submit will work
            twitterService.updateStatus($scope.tweet).then(function(data) {
                    }

Tools:
------
         Twitter
         OAuth.io