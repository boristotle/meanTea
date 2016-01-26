angular.module('myApp').service('cartService', function() {
 var cart = [];
 return {
    cart: cart,
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
      }
      return total;
    }
}

})