angular
  .module("movieApp")
  .controller("homeController", function($scope, $anchorScroll, searchService) {
    $scope.scrollToRecommendations = function() {
      $anchorScroll("recommendation-container");
    };
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
      start: 18
    };
    $scope.$on("youtube.player.ready", function($event, player) {
      player.mute();
    });
    // $scope.homePlayer.mute();
    searchService
      .findMoviesBy("popular")
      .then(function(response) {
        console.log(response.data);
        $scope.popular = response.data.results;
        return response;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  });
