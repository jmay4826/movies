angular
  .module("movieApp")
  .controller("personalizeController", function($scope, searchService, random) {
    $scope.showActions = true;
    $scope.liked = [];
    $scope.disliked = [];
    $scope.action = function(choice, movieId) {
      $scope.random[movieId].alreadyVoted = true;
      console.log($scope.random[movieId].alreadyVoted);
      if (choice === "yes") {
        $scope.liked.push($scope.random[movieId]);
      } else {
        $scope.disliked.push($scope.random[movieId]);
      }
    };

    $scope.getSimilarities = function(type) {
      var likesToAnalyze = $scope.liked.map(function(movie) {
        return movie[type];
      });

      likesToAnalyze = _.flatten(likesToAnalyze);

      var duplicateLikes = {};

      for (var i = 0; i < likesToAnalyze.length; i++) {
        if (likesToAnalyze.indexOf(likesToAnalyze[i]) !== i) {
          if (duplicateLikes[likesToAnalyze[i]]) {
            duplicateLikes[likesToAnalyze[i]]++;
          } else {
            duplicateLikes[likesToAnalyze[i]] = 2;
          }
        }
      }

      var dislikesToAnalyze = $scope.disliked.map(function(movie) {
        return movie[type];
      });

      dislikesToAnalyze = _.flatten(dislikesToAnalyze);

      var duplicateDislikes = {};

      for (var i = 0; i < dislikesToAnalyze.length; i++) {
        if (dislikesToAnalyze.indexOf(dislikesToAnalyze[i]) !== i) {
          if (duplicateDislikes[dislikesToAnalyze[i]]) {
            duplicateDislikes[dislikesToAnalyze[i]]++;
          } else {
            duplicateDislikes[dislikesToAnalyze[i]] = 2;
          }
        }
      }

      var likeDifference = {};
      //   var largerObject = (_.size(duplicateDislikes) > _.size(duplicateLikes)) ? duplicateDislikes : duplicateLikes
      if (_.size(duplicateDislikes) > _.size(duplicateLikes)) {
        for (var key in duplicateDislikes) {
          if (duplicateLikes[key]) {
            likeDifference[key] = duplicateLikes[key] - duplicateDislikes[key];
          }
        }
      } else {
        for (var key in duplicateLikes) {
          if (duplicateDislikes[key]) {
            likeDifference[key] = duplicateLikes[key] - duplicateDislikes[key];
          }
        }
      }

      //   var numLikes =
      console.log(duplicateDislikes);
      console.log(duplicateLikes);
      console.log(likeDifference);
    };

    // $scope.similarActors = function() {
    //   var likedActors = $scope.liked.map(function(movie) {
    //     return movie.cast;
    //   });
    //   likedActors = _.flatten(likedActors);

    //   var actorsObj = {};
    //   for (var i = 0; i < likedActors.length; i++) {
    //     if (likedActors.indexOf(likedActors[i]) !== i) {
    //       if (actorsObj[likedActors[i]]) {
    //         actorsObj[likedActors[i]]++;
    //       } else {
    //         actorsObj[likedActors[i]] = 1;
    //       }
    //     }
    //   }
    //   console.log(actorsObj);
    // };

    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });
    console.log(random);
    $scope.random = random.data.results;

    $scope.getRandomMovies = searchService.discover;
  });
