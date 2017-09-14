angular
  .module("movieApp")
  .controller("personalizeController", function(
    $scope,
    searchService,
    random,
    personalizeService
  ) {
    $scope.recommendedMovie = {
      title: "Ready for your recommendation?",
      dummy: true
    };
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
        for (var key in genres) {
          if (genres[key] > mostImportant.amount) {
            mostImportant.amount = genres[key];
            mostImportant.content = key;
          }
        }
        console.log(
          searchService
            .discover("&with_genres=" + mostImportant.content)
            .then(function(response) {
              response = response.data.results.filter(function(movie) {
                return $scope.randomIds.indexOf(movie.id) === -1;
              });
              $scope.recommendedMovie = response[0];
            })
        );
        console.log(mostImportant);
      } else if (choice === "personalize") {
      }
    };
    $scope.showActions = true;
    $scope.liked = [];
    $scope.disliked = [];
    $scope.cardAction = function(choice, movieId) {
      $scope.random[movieId].alreadyVoted = true;
      console.log($scope.random[movieId].alreadyVoted);
      if (choice === "yes") {
        $scope.liked.push($scope.random[movieId]);
      } else {
        $scope.disliked.push($scope.random[movieId]);
      }
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
