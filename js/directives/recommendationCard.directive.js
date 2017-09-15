angular
  .module("movieApp")
  .directive("recommendationCard", function(searchService) {
    return {
      restrict: "E",
      templateUrl: "js/directives/recommendationCardTemplate.html",
      scope: {
        movie: "=",
        showActions: "=",
        action: "&",
        index: "=",
        genres: "="
      },
      link: function(scope, elements, attributes) {
        scope.imageBaseUrl = searchService.imageBaseUrl;
        scope.imageSize = searchService.imageSize;
      }
    };
  });
