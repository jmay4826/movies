angular
  .module("movieApp")
  .controller("recommendationsController", function(
    $scope,
    $state,
    personalizeService,
    searchService
  ) {
    $scope.genres = searchService.genres;
    $scope.recommended = personalizeService.recommended;
    $scope.removeLocalStorage = function() {
      localStorage.clear();
      personalizeService.recommended = [];
      $state.go("personalize");
    };
  });
