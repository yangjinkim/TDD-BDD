var app = angular.module('agileApp', []);

app.controller('agileCtrl', function($scope){

  $scope.userId = '';
  $scope.userPassword = '';
  $scope.clickFunction = function() {
    $.post('/', {
      userId: $scope.userId,
      userPassword: $scope.userPW
    });
    // login  jQuery POST
  };
});

$(document).ready(function() {
    $('#signupForm').bootstrapValidator();
});
