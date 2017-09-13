angular
  .module("movieApp", ["ui.router", "ngMaterial"])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/js/home/homeTemplate.html",
        controller: "homeController",
        resolve: {
          apiConfig: function(searchService) {
            return searchService.apiConfiguration();
          }
        }
      })
      .state("personalize", {
        url: "/personalize",
        templateUrl: "/js/personalize/personalizeTemplate.html",
        controller: "personalizeController",
        resolve: {
          random: function(searchService) {
            return searchService.discover("").then(function(response) {
              return response;
            });
          },
          apiConfig: function(searchService) {
            return searchService.apiConfiguration();
          }
        }
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("grey")
      .accentPalette("blue-grey")
      .dark();
  });
