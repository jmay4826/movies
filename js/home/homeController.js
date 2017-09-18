angular
  .module("movieApp")
  .controller("homeController", function(
    $scope,
    $anchorScroll,
    searchService,
    personalizeService
  ) {
    $scope.personalized = personalizeService.recommended;
    searchService.apiConfiguration().then(function() {
      $scope.imageBaseUrl = searchService.imageBaseUrl;
      $scope.imageSize = searchService.imageSize;
    });
    $scope.genres = searchService.genres;
    $scope.defaultVideo = "PjfP2tmjtQM";
    $scope.playerVars = {
      controls: 0,
      autoplay: 1,
      loop: 1,
      modestbranding: 1,
      playsInline: 1,
      showinfo: 0,
      start: 19
    };
    $scope.$on("youtube.player.playing", function($event, player) {
      player.mute();
    });

    searchService
      .findMoviesBy("popular")
      .then(function(response) {
        $scope.popular = response.data.results;
        return response;
      })
      .catch(function(error) {
        return error;
      });
    searchService
      .findMoviesBy("top_rated")
      .then(function(response) {
        $scope.topRated = response.data.results;
        return response;
      })
      .catch(function(error) {
        return error;
      });
  });
