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

    $scope.getAveragePopularity = function() {
      var likesToAnalyze = $scope.liked.map(function(movie) {
        return movie.popularity;
      });
      var sum = 0;
      for (var i = 0; i < likesToAnalyze.length; i++) {
        sum += likesToAnalyze[i];
      }
      var average = sum / i;
      console.log(average);
      return average;
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

      for (var key in duplicateDislikes) {
        likeDifference[key] =
          (duplicateLikes[key] || 0) - (duplicateDislikes[key] || 0);
      }
      for (var key in duplicateLikes) {
        likeDifference[key] =
          (duplicateLikes[key] || 0) - (duplicateDislikes[key] || 0);
      }

      console.log(duplicateDislikes);
      console.log(duplicateLikes);
      console.log(likeDifference);
    };

    $scope.random = random.data.results;
  });
