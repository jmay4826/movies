angular
  .module("movieApp")
  .controller("detailController", function(
    $scope,
    searchService,
    movie,
    $stateParams,
    $sce
  ) {
    $scope.movie = movie.data;
    $scope.movie.videos.results = $scope.movie.videos.results.map(function(
      video
    ) {
      video.key = $sce.trustAsResourceUrl(
        "https://www.youtube.com/embed/" + video.key
      );
      return video;
    });

    // $scope.movie.videos.results[0].key = $sce.trustAsResourceUrl(
    //   "https://www.youtube.com/embed/" + $scope.movie.videos.results[0].key
    // );
    $scope.trailerStyle = {
      true: {
        width: "100%",
        left: "0px;",
        background: "rgb(48,48,48)"
      },
      false: { width: "5%", top: "0px", right: "0px" },
      hover: { width: "10%" }
    };

    $scope.showTrailer = false;
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
