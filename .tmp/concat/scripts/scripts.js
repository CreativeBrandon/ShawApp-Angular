'use strict';

/**
 * @ngdoc overview
 * @name shawApp
 * @description
 * # shawApp
 *
 * Main module of the application.
 */
angular
  .module('shawApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name shawApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shawApp
 */
angular.module('shawApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {

    var jsonDataLocal = 'http://localhost:9000/api/results-2011-2.js';
    var jsonDataLocal = 'http://localhost:9000/api/results-2011.js';
    var jsonDataRemote = 'http://static.globalnews.ca/content/test/results-2011.js';


    // GET DATA FROM GLOBAL API
  	$http({method: 'GET', url: jsonDataRemote}).
    then(function successCallback(response) {

      //Check data for valid JSON format
      if (typeof response.data !== 'object'){
        response.data = extractJSON( response.data );
      }

      //SUM UP CANDIDATE VOTES AND AD TO SCOPE
      response.data = sumUpVotes( response.data );
      $scope.ridings = response.data;


    }, function errorCallback(response) {
        console.log(response);
    });
    


    // TOGGLE SLIDES
    $(".next").click(function(e){
      toggleSlide('next');
    });
    $(".previous").click(function(e){
      toggleSlide('previous');
    });


    //TOGGLE SLIDES - ARROW KEY SUPPORT
    var slider = $(".carousel-container")[0];
    slider.onkeydown = function(event){

      if (!event) event = window.event;
      var code = event.keyCode;

      if(event.charCode && code == 0) code = event.charCode;
      switch(code){
        case 37:
          toggleSlide('previous');
          break;
        case 39:
          toggleSlide('next');
          break;
      }
    }

  }]);

// SUM UP VOTES
var sumUpVotes = function (data){

  for(var ridings in data){
    var candidates = data[ridings].results;
    var totalVotes = 0;

    for(var candidate in candidates){
      totalVotes = parseInt(candidates[candidate].votes) + totalVotes;
    }
    data[ridings].totalVotes = totalVotes;
  }

  return data;
}

// EXTRACT JSON FROM STRING -- API RETURNS STRING JSON INSTEAD OF OBJ
var extractJSON = function( string ){
    string = string.replace("gNews_getRidingDetailsCallback(", "(")
                       .replace("(", "")
                       .replace(")", "")
                       .replace(";", "");

    var json = JSON.parse(string);
    return json;
}

//TOGGLE SLIDE
var toggleSlide = function(direction){

  var speed = 90;
  var currentSlide = $(".carousel li:visible");
  currentSlide.hide();

  //PREV OR NEXT DIRECTION VARS 
  switch(direction){
    case 'previous':
      var nextSlide = currentSlide.prev('li');
      var resetSlide = $(".carousel li:last-child");
      $(".previous").focus();
      break;
    case 'next':
      var nextSlide = currentSlide.next('li');
      var resetSlide = $(".carousel li:first-child");
      $(".next").focus();
      break;
  }

  //SHOW NEXT SLIDE OR REST IF AT LAST SLIDE
  if(nextSlide.length === 0){
    resetSlide.show(speed);
  }else{
    nextSlide.show(speed);
  }
}
'use strict';

/**
 * @ngdoc function
 * @name shawApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shawApp
 */
angular.module('shawApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('shawApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"article-title\"> <h1>Election Results</h1> </div> <div class=\"carousel-container\"> <button aria-controls=\"carousel\" class=\"btn previous\"><i class=\"fa fa-arrow-left\"></i><span class=\"sr-only\">Previous slide</span></button> <button aria-controls=\"carousel\" class=\"btn next\"><i class=\"fa fa-arrow-right\"></i><span class=\"sr-only\">next slide</span></button> <ul id=\"carousel\" class=\"carousel\"> <li class=\"card\" ng-repeat=\"riding in ridings\"> <div class=\"results\"> <div class=\"riding-info\"> <h2>{{riding.name}}</h2> <p><span>Total Votes:</span> {{riding.totalVotes | number:0}}</p> </div> <table> <caption class=\"sr-only\">{{riding.name}} Candidates</caption> <thead> <tr> <th scope=\"col\" class=\"name\">Candidate</th> <th scope=\"col\">Party</th> <th scope=\"col\">Votes</th> <th scope=\"col\" class=\"percentage\">%</th> </tr> </thead> <tbody> <tr ng-repeat=\"person in riding.results | orderBy:'-votes'\" ng:class=\"{true: 'first', false: ''}[$index==0]\"> <td class=\"partyMarker\" ng:class=\"person.partyCode\">{{person.name}}</td> <td>{{person.partyCode}}</td> <td>{{person.votes}}</td> <td>{{person.votes / riding.totalVotes * 100 | number:0}}%</td> </tr> </tbody> </table> </div> </li> </ul> </div> <!--\n" +
    "<div class=\"row marketing\">\n" +
    "  <h4>HTML5 Boilerplate</h4>\n" +
    "  <p>\n" +
    "    HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Angular</h4>\n" +
    "  <p>\n" +
    "    AngularJS is a toolset for building the framework most suited to your application development.\n" +
    "  </p>\n" +
    "\n" +
    "  <h4>Karma</h4>\n" +
    "  <p>Spectacular Test Runner for JavaScript.</p>\n" +
    "</div>\n" +
    "-->"
  );

}]);
