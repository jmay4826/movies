angular
  .module("movieApp")
  .controller("detailController", function(
    $scope,
    searchService,
    movie,
    $stateParams
  ) {
    $scope.movie = movie.data;
    $scope.movie.vote_average = $scope.movie.vote_average / 2;
    $scope.movie.ratingStars = [];
    for (var i = 0; i < 5; i++) {
      if ($scope.movie.vote_average > i + 1) {
        $scope.movie.ratingStars[i] = "star";
      } else if (
        $scope.movie.vote_average < i + 1 &&
        $scope.movie.vote_average > i
      ) {
        $scope.movie.ratingStars[i] = "star_half";
      } else {
        $scope.movie.ratingStars[i] = "star_border";
      }
    }
    console.log($scope.movie);
    $scope.imageBaseUrl = searchService.imageBaseUrl;
    $scope.imageSize = searchService.imageSize;

    $scope.scrollerStyle = { height: "0px" };
    if (!$scope.similar) {
      searchService.getSimilar($stateParams.id).then(function(response) {
        $scope.similar = response.data.results;
        console.log($scope.similar);
      });
    }

    $scope.getSimilar = function() {
      $scope.showSimilar = !$scope.showSimilar;
      if ($scope.showSimilar) {
        $scope.scrollerStyle = { height: "180px" };
      } else {
        $scope.scrollerStyle = { height: "0px" };
      }
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
