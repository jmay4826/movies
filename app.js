angular
  .module("movieApp", ["ui.router", "ngMaterial"])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/js/home/homeTemplate.html",
        controller: "homeController"
      })
      .state("personalize", {
        url: "/personalize",
        templateUrl: "/js/personalize/personalizeTemplate.html",
        // controller: "homeController"
        controller: "personalizeController",
        resolve: {
          random: function(searchService) {
            return searchService.discover("").then(function(response) {
              console.log(response);
              return response;
            });
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
