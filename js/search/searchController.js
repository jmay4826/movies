angular
  .module("movieApp")
  .controller("searchController", function($scope, searchService) {
    $scope.test = "Test";
    // searchService.findMoviesBy("popular");
  });
