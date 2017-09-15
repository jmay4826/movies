angular
  .module("movieApp")
  .controller("homeController", function($scope, $anchorScroll, searchService) {
    $scope.scrollToRecommendations = function() {
      $anchorScroll("recommendation-container");
    };
    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });
    $scope.genres = searchService.genres;

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
