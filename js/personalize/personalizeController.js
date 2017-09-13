angular
  .module("movieApp")
  .controller("personalizeController", function($scope, searchService, random) {
    $scope.showActions = true;
    $scope.action = function() {
      console.log("clicked");
    };
    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });

    $scope.random = random.data.results;
    console.log($scope.random);
    $scope.getRandomMovies = searchService.discover;
  });
