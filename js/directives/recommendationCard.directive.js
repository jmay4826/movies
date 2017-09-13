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
        scope.imageBaseUrl = searchService.imageBaseUrl;
        scope.imageSize = searchService.imageSize;
        // searchService.apiConfiguration().then(function() {
        //   console.log(searchService.imageBaseUrl);
        //   console.log(searchService.imageSize);
        //   scope.imageBaseUrl = searchService.imageBaseUrl;
        //   scope.imageSize = searchService.imageSize;
        // });
      }
    };
  });
