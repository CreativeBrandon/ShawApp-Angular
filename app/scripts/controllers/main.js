'use strict';

/**
 * @ngdoc function
 * @name shawApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shawApp
 */
angular.module('shawApp')
  .controller('MainCtrl', function ($scope, $http) {

    var jsonDataLocal = 'http://localhost:9000/api/results-2011-2.js';
    var jsonDataLocal = 'http://localhost:9000/api/results-2011.js';
    var jsonDataRemote = 'http://static.globalnews.ca/content/test/results-2011.js';


    // GET DATA FROM GLOBAL API
  	$http({method: 'GET', url: jsonDataLocal}).
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

  });

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