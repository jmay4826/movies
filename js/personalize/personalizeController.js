angular
  .module("movieApp")
  .controller("personalizeController", function($scope, searchService, random) {
    $scope.showActions = true;
    $scope.liked = [];
    $scope.disliked = [];
    $scope.action = function(choice, movieId) {
      $scope.random[movieId].alreadyVoted = "true";
      console.log($scope.random[movieId].alreadyVoted);
      if (choice === "yes") {
        console.log($scope.random[movieId]);
        $scope.liked.push($scope.random[movieId]);
        // console.log($scope.liked);
      } else {
        $scope.disliked.push($scope.random[movieId]);
      }
      console.log(choice, movieId);
    };
    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });

    $scope.random = random.data.results;
    // $scope.random = $scope.random.map(function(element) {
    //   element.alreadyVoted = false;
    //   return element;
    // });
    console.log($scope.random);
    $scope.getRandomMovies = searchService.discover;
  });
