var express = require('express');
var router = express.Router();



// THIS IS THE CATCH-ALL ROUTE
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});
module.exports = router;
