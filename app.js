angular
  .module("movieApp", ["ui.router", "ngMaterial", "jkAngularCarousel"])
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
            return searchService
              .discover("&vote_average.gte=4.9", true)
              .then(function(response) {
                return response;
              });
          },
          apiConfig: function(searchService) {
            return searchService.apiConfiguration();
          }
        }
      })
      .state("detail", {
        url: "/detail/:id",
        templateUrl: "/js/detail/detailTemplate.html",
        controller: "detailController",
        resolve: {
          movie: function(searchService, $stateParams) {
            return searchService.findMovieDetails($stateParams.id);
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
