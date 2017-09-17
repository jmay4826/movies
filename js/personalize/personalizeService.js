angular.module("movieApp").service("personalizeService", function() {
  this.recommended = JSON.parse(localStorage.getItem("recommended"));
  this.getSimilarities = function(type, liked, disliked) {
    var likesToAnalyze = liked.map(function(movie) {
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

    var dislikesToAnalyze = disliked.map(function(movie) {
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
    return likeDifference;
  };
});
