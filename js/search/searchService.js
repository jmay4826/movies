angular.module("movieApp").service("searchService", function($http) {
  var that = this;
  var apiUrl = "https://api.themoviedb.org/3/";
  var apiKey = "?api_key=1c18362aec433105dd7c8fc4efb15a14";
  // this.imageBaseUrl = "http://image.tmdb.org/t/p/";
  // this.imageSize = "w780";

  this.apiConfiguration = function() {
    return $http
      .get(apiUrl + "configuration" + apiKey)
      .then(function(response) {
        that.imageBaseUrl = response.data.images.base_url;
        console.log(that.imageBaseUrl);
        that.imageSize = response.data.images.backdrop_sizes[1];
        console.log(that.imageSize);
        // console.log(response);
      });
  };
  this.findMoviesBy = function(selector) {
    return $http.get(apiUrl + "movie/" + selector + apiKey);
  };
  this.findMovieDetails = function(id) {
    return $http.get(
      apiUrl + "movie/" + id + apiKey + "&append_to_response=reviews"
    );
  };
  this.getSimilar = function(id) {
    return $http.get(apiUrl + "movie/" + id + "/recommendations" + apiKey);
  };

  this.discover = function(options) {
    return $http
      .get(apiUrl + "discover/movie" + apiKey + options)
      .then(function(response) {
        response.data.results = response.data.results.map(function(movie) {
          // console.log(movie);
          $http
            .get(apiUrl + "movie/" + movie.id + "/credits" + apiKey)
            .then(function(detailResponse) {
              movie.cast = detailResponse.data.cast.map(function(actor) {
                return actor.name;
              });
              return detailResponse;
            });
          return movie;
        });
        return response;
      });
  };
});
