angular
  .module("movieApp")
  .controller("recommendationsController", function(
    $scope,
    $state,
    personalizeService
  ) {
    $scope.recommended = personalizeService.recommended;
    $scope.removeLocalStorage = function() {
      localStorage.clear();
      $state.go("personalize");
    };
  });
