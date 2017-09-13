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
      .state("search", {
        url: "/search",
        templateUrl: "/js/search/searchTemplate.html",
        controller: "searchController"
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("grey")
      .accentPalette("blue-grey")
      .dark();
  });
