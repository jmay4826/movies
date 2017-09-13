angular
  .module("movieApp")
  .controller("homeController", function($scope, searchService) {
    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });
    $scope.test = "test";
    console.log(searchService.imageBaseUrl);
    // $scope.imageBaseUrl = searchService.imageBaseUrl;
    // $scope.imageSize = searchService.imageSize;
    searchService.findMoviesBy("211672/videos").then(function(response) {
      console.log(response);
    });
    searchService
      .findMoviesBy("popular")
      .then(function(response) {
        console.log(response.data);
        $scope.popular = response.data.results;
        return response;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  });
