/*global angular*/

angular.module('ionicApp', ['ionic', 'ionic-material', 'waterline', 'fishbowl', 'fsm'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: '/event',
      abstract: true,
      templateUrl: 'templates/event-menu.html'
    })
    .state('eventmenu.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('eventmenu.aquarium', {
      url: '/aquarium',
      views: {
        'menuContent' :{
          templateUrl: 'js/fish/fish.html',

        }
      }
    })
    .state('eventmenu.fish', {
      url: '/fish',
      views: {
        'menuContent' :{
          templateUrl: 'templates/fish.html',
          controller: 'CheckinCtrl'
        }
      }
    })
    .state('eventmenu.attendees', {
      url: '/attendees',
      views: {
        'menuContent' :{
          templateUrl: 'templates/attendees.html',
          controller: 'AttendeesCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/event/home');
})

.controller('MainCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate, $timeout) {

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  $scope.assocs = {};
  
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('CheckinCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $timeout) {

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);


  $scope.showForm = true;

  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];

  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      /*jshint ignore:start*/
      alert('Info required');
      /*jshint ignore:end*/
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };

})

.controller('AttendeesCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $timeout) {

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);


  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };

});
/*endglobal angular*/