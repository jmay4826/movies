angular
  .module("movieApp")
  .controller("personalizeController", function(
    $scope,
    searchService,
    random,
    personalizeService,
    $document,
    $state
  ) {
    $scope.imageBaseUrl = searchService.imageBaseUrl;
    $scope.imageSize = searchService.imageSize;

    $scope.recommendedMovie = {
      title: "Ready for your recommendation?",
      dummy: true
    };
    $scope.genres = searchService.genres;
    $scope.recommend = function() {
      var genres = personalizeService.getSimilarities(
        "genre_ids",
        $scope.liked,
        $scope.disliked
      );
      var cast = personalizeService.getSimilarities(
        "cast",
        $scope.liked,
        $scope.disliked
      );

      var mostImportant = { amount: -100, content: "" };
      var secondImportant = { amount: -100, content: "" };
      for (var key in genres) {
        if (genres[key] > mostImportant.amount) {
          mostImportant.amount = genres[key];
          mostImportant.content = key;
        } else if (genres[key] > secondImportant.amount) {
          secondImportant.amount = genres[key];
          secondImportant.content = key;
        }
      }
      searchService
        .discover(
          "&primary_release_date.lte=2017-07-01&with_genres=" +
            mostImportant.content
        )
        .then(function(response) {
          response = response.data.results.filter(function(movie) {
            return $scope.randomIds.indexOf(movie.id) === -1;
          });
          personalizeService.recommended = response;
          localStorage.setItem(
            "recommended",
            JSON.stringify(personalizeService.recommended)
          );
          $scope.recommended = response;
          $scope.recommendedMovie.likedGenre =
            searchService.genres[mostImportant.content];
          $scope.recommendedMovie.recommendation = true;
          $state.go("recommendations");
        });
    };
    $scope.showActions = true;
    $scope.liked = JSON.parse(localStorage.getItem("liked")) || [];
    $scope.disliked = JSON.parse(localStorage.getItem("disliked")) || [];
    $scope.cardAction = function(choice, movie) {
      if (choice === "yes") {
        $scope.liked.unshift(movie);
        localStorage.setItem("liked", JSON.stringify($scope.liked));
      } else {
        $scope.disliked.unshift(movie);
        localStorage.setItem("disliked", JSON.stringify($scope.disliked));
      }
      $scope.random.shift();
      localStorage.setItem("random", JSON.stringify($scope.random));
    };

    $scope.getSimilarities = function(type, liked, disliked) {
      personalizeService.getSimilarities(type, liked, disliked);
    };

    $scope.random =
      JSON.parse(localStorage.getItem("random")) || random.data.results;
    $scope.randomIds =
      JSON.parse(localStorage.getItem("randomIds")) ||
      $scope.random.map(function(movie) {
        return movie.id;
      });
    localStorage.setItem("randomIds", JSON.stringify($scope.randomIds));
    console.log($scope.randomIds);
  });
