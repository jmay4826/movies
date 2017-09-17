angular
  .module("movieApp")
  .controller("recommendationsController", function(
    $scope,
    searchService,
    personalizeService,
    $document
  ) {
    $scope.recommended = personalizeService.recommended;
    $scope.test = "rec test";
  });
