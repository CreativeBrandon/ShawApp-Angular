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

  	$http({method: 'GET', url: jsonDataLocal}).
    then(function successCallback(response) {

      //Check data for valid JSON format
      if (typeof response.data !== 'object'){
        response.data = extractJSON( response.data );
      }

      //add data to scope 
      console.log( response.data.length );
      $scope.ridings = response.data;


    }, function errorCallback(response) {
        console.log(response);
    });
    

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $(".next").click(function(e){
      nextSlide(e);
    });
    $(".previous").click(function(e){
      prevSlide(e);
    });

  });

var extractJSON = function( string ){

    string = string.replace("gNews_getRidingDetailsCallback(", "(")
                       .replace("(", "")
                       .replace(")", "")
                       .replace(";", "");

    var json = JSON.parse(string);
    return json;
}

//Init Carousel 
var carousel = function (){
    //var carousel = function(){
    $(".carousel li").first().addClass('selected');
    var totalSlides = $(".carousel li").length;
    alert( totalSlides );
}

var nextSlide = function(e){
  //console.log( e.currentTarget );
  var count = $('.carousel li').length;
  var currentSlide = $(".carousel li:visible");
  var nextSlide = currentSlide.next('li');
  var slideWidth = currentSlide.width();
  var distance = slideWidth;
  var speed = 90;
  //console.log(nextSlide);
  currentSlide.hide();

  if(nextSlide.length === 0){
    $(".carousel li:first-child").show(speed);
  }else{
    nextSlide.show(speed);
  }

  /*var i = 1;
  $(".carousel li").each(function(){
    distance = slideWidth * i;
    $(this).animate({"left": '-'+distance+'px' }, "slow");
    i++;
  });*/
  //console.log( slideWidth );

}

var prevSlide = function(){
  var currentSlide = $(".carousel li:visible");
  var nextSlide = currentSlide.prev('li');
  var speed = 90;
  currentSlide.hide();

  if(nextSlide.length === 0){
    $(".carousel li:last-child").show(speed);
  }else{
    nextSlide.show(speed);
  }

}

/*var cleanJSON = function(data){
    // preserve newlines, etc - use valid JSON
    // preserve newlines, etc - use valid JSON

    data = data.replace(/\\n/g, "\\n")  
                   .replace(/\\'/g, "\\'")
                   .replace(/\\"/g, '\\"')
                   .replace(/\\&/g, "\\&")
                   .replace(/\\r/g, "\\r")
                   .replace(/\\t/g, "\\t")
                   .replace(/\\b/g, "\\b")
                   .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    data = data.replace(/[\u0000-\u0019]+/g,""); 
    var data = JSON.parse(data);

    return data;
}*/
