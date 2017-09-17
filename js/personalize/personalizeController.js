angular
  .module("movieApp")
  .controller("personalizeController", function(
    $scope,
    searchService,
    random,
    personalizeService,
    $document
  ) {
    $scope.imageBaseUrl = searchService.imageBaseUrl;
    $scope.imageSize = searchService.imageSize;

    $document.scrollTopAnimated();

    $scope.recommendedMovie = {
      title: "Ready for your recommendation?",
      dummy: true
    };
    $scope.genres = searchService.genres;
    $scope.recommendationAction = function(choice) {
      if (choice === "recommend") {
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

        console.log(genres, cast);
        var mostImportant = { amount: 0, content: "" };
        var secondImportant = { amount: 0, content: "" };
        for (var key in genres) {
          if (genres[key] > mostImportant.amount) {
            mostImportant.amount = genres[key];
            mostImportant.content = key;
          } else if (genres[key] > secondImportant.amount) {
            secondImportant.amount = genres[key];
            secondImportant.content = key;
          }
        }
        console.log(
          searchService
            .discover(
              "&primary_release_date.lte=2017-07-01&with_genres=" +
                mostImportant.content
            )
            .then(function(response) {
              personalizeService.recommended = response.data.results;
              response = response.data.results.filter(function(movie) {
                return $scope.randomIds.indexOf(movie.id) === -1;
              });

              $scope.recommended = response;
              $scope.recommendedMovie.likedGenre =
                searchService.genres[mostImportant.content];
              $scope.recommendedMovie.recommendation = true;
            })
        );
        console.log(mostImportant);
      } else if (choice === "personalize") {
      }
    };
    $scope.showActions = true;
    $scope.liked = [];
    $scope.disliked = [];
    $scope.cardAction = function(choice, movie) {
      if (choice === "yes") {
        $scope.liked.unshift(movie);
      } else {
        $scope.disliked.unshift(movie);
      }
      $scope.random.shift();
    };

    $scope.getSimilarities = function(type, liked, disliked) {
      personalizeService.getSimilarities(type, liked, disliked);
    };

    $scope.random = random.data.results;
    $scope.randomIds = $scope.random.map(function(movie) {
      return movie.id;
    });
    console.log($scope.randomIds);
  });
