angular
  .module("movieApp")
  .controller("detailController", function($scope, searchService, movie) {
    $scope.movie = movie.data;
    console.log($scope.movie);
    $scope.imageBaseUrl = searchService.imageBaseUrl;
    $scope.imageSize = searchService.imageSize;
    $scope.getSimilar = function(id) {
      searchService.getSimilar(id).then(function(response) {
        $scope.similar = response;
      });
    };

    // searchService
    //   .findMoviesBy("popular")
    //   .then(function(response) {
    //     console.log(response.data);
    //     $scope.popular = response.data.results;
    //     return response;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //     return error;
    //   });
  });
