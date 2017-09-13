angular
  .module("movieApp")
  .directive("recommendationCard", function(searchService) {
    return {
      restrict: "E",
      templateUrl: "/js/directives/recommendationCardTemplate.html",
      scope: {
        movie: "=",
        showActions: "=",
        action: "&"
      },
      link: function(scope, elements, attributes) {
        searchService.apiConfiguration().then(function() {
          scope.imageBaseUrl = searchService.imageBaseUrl;
          scope.imageSize = searchService.imageSize;
        });
      }
    };
  });
