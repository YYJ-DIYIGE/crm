var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var authController = require('./../controllers/auth.js');
var clueController = require('./../controllers/clue.js');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',authController.login);
router.post('/user',userController.insert);
router.put('/user/',userController.update);
router.put('/clue/:id',clueController.update);
router.post('/clue/:id',clueController.addLog);
router.post('/out',authController.out);
router.post('/clue',clueController.insert);
module.exports = router;
