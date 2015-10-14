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
