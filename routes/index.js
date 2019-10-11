var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var authController = require('./../controllers/auth.js');
var clueController = require('./../controllers/clue.js');
var authMiddleware = require('./../middlewares/auth.js');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', authController.renderlogin);
router.get('/admin/user', authMiddleware,userController.show);
router.get('/admin/user/user_create', authMiddleware,userController.renderUserCreate);
router.get('/admin/user/:id/edit',authMiddleware,userController.renderUserEdit);
router.get('/admin/user/clue', authMiddleware,clueController.show);
router.get('/admin/clue/:id', authMiddleware,clueController.log);
module.exports = router;
