var app = angular.module('myApp', ['ngRoute'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/partials/home.html',
    controller: 'homeController'
  })
  .when('/checkout',{
    templateUrl: '/partials/checkout.html',
    controller: 'checkoutController'
  })
  $locationProvider.html5Mode(true)
})


app.controller('homeController', function($scope, $http, cartService, $rootScope){
  $http.get('/javascripts/teas.json').then(function(response) {
    $scope.teas = response.data;
    $scope.categories = [];
    for (var i = 0; i < response.data.length; i++) {
      for (var j = 0; j < response.data[i].categories.length; j++) {
          $scope.categories.push(response.data[i].categories[j]);
      }
    } 

     $scope.caffeineMeter = $scope.teas;


   setInterval(function() {
    // console.log($('.semi-circle--mask').length)
      for (var i = 0; i < $('.semi-circle--mask').length; i++) {
                 var newVal = $scope.teas[i].caffeineScale / 2;
                 $('.gauge--3 .semi-circle--mask').eq(i).attr({
                  style: '-webkit-transform: rotate(' + newVal + 'deg);' +
                 '-moz-transform: rotate(' + newVal + 'deg);' +
                 'transform: rotate(' + newVal + 'deg);'
                });        
        }
               }, 500);




    // console.log($scope.teas);

      $scope.catList = [];
      // console.log($scope.categories);
      for (var i = 0; i < $scope.categories.length; i++) {
          if ($scope.catList.indexOf($scope.categories[i]) < 0) {
          $scope.catList.push($scope.categories[i]);
          } 
       }

  $scope.bagCount = cartService.cart.length || 'Empty!'

  $scope.cart = cartService.cart;
  $scope.addToCart = function() {
    // console.log(this.quantity);
    // console.log(this.tea.name);
    // console.log(this.tea.price);
    // console.log(this.tea.imageUrl);
    $scope.cart.push({quantity: this.quantity || 1, name: this.tea.name, 
      price: this.tea.price, imageUrl: this.tea.imageUrl, caffeineScale: this.tea.caffeineScale,
      rating: this.tea.rating, ingredients: this.tea.ingredients})
    $scope.bagCount = '(' + $scope.cart.length + ')';
  }

  })

  // $scope.sortOrder = '-rating';
})

app.controller('checkoutController', function($scope, $http, cartService){
  $scope.cart = cartService.cart;
      // console.log(cartService.cart);
  $scope.totalPrice = cartService.totalPrice();

  $scope.removeTea = function() {
    // console.log(this.item);
    $scope.cart.splice($scope.cart.indexOf(this.item), 1);
    $scope.totalPrice = cartService.totalPrice();
  }

  $scope.editTheTea = function() {
    this.editTea = !this.editTea;
  }

  $scope.editQuantity = function() {
    // console.log(this);
    $scope.totalPrice = cartService.totalPrice();
  }


  })
