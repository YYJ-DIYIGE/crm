const User = require('./../models/user.js');
const authCodeFunc = require('./../utils/authCode.js');

const authController = {
  login: async function(req,res,next){
    let phone = req.body.phone;
    let password = req.body.password;

    if (!phone || !password) {
      res.json({code: 0, data: 'prsrms empty!'});
      return
    }
    try{
      const users = await User.select({phone,password});
      const user = users[0];
      if (user) {
        let auth_Code = phone + '\t' + password + '\t'+ user.id +'\t'+ user.role;
        auth_Code = authCodeFunc(auth_Code,'ENCODE');
        res.cookie('ac', auth_Code, { maxAge: 24* 60 * 60 * 1000 ,httpOnly: true});
        res.cookie('user_name', user.name, { maxAge: 24* 60 * 60 * 1000 ,httpOnly: true});
        res.json({ code: 200, message: '登录成功！'})
      }else{
        res.json({code: 0, message: '登录失败，没有此用户!!!'});
      }
    }catch(e){
      res.json({code: 0, message:'系统问题请管理员处理'});
    }
  },
  renderlogin: async function(req,res,next){
    res.render('login');
  },
  out:async function(req,res,next){
    try{
      res.cookie('ac', { expires: new Date() ,httpOnly: true});
      res.cookie('user_name', { expires:new Date() ,httpOnly: true});
      res.json({
        code:200,
        message:'out success'
      })
    }catch(err){
      res.json({code:0})
    }

  }
}
module.exports = authController;