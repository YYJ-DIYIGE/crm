const User = require('./../models/user.js');
const {formatTime}  = require('./../utils/formdate.js');

const userController = {
  show: async function(req,res,next){
    try{
      const users = await User.all();
        res.locals.users = users.map((data)=>{
        data.role_display = ( data.role == 1 ) ? '管理员' : '销售';
        data.created_time = formatTime(data.created_time);
        return data
      });
    res.locals.nav = 'user';
    res.render('admin/user');
    }catch(e){
      console.log(e)
      res.locals.error = e;
      res.render('error',)
    }
  },
  insert: async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let role = req.body.role;
    let created_time = new Date();
    if(!name || !phone || !password || !role){
      res.json({ code: 0, message: '缺少必要参数' });
      return
    }
    
    try{
      const users = await User.insert({ 
        name, phone, password, role, created_time
      });
      res.json({ code: 200, data: users})
    }catch(e){
      console.log(e)
      res.json({ code: 0, message: '内部错误' })
    }
  },
  update: async function(req,res,next){
    let id = req.body.id;
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    if(!name || !id || !phone || !password){
      res.json({ code: 0, data: 'params empty!' });
      return
    }

    try{
      const user = await User.update(id,{ name,phone,password});
      res.json({ code: 200, data: user})
    }catch(e){
      res.json({ code: 0, data: e })
    }
  },
  delete: async function(req,res,next){
    let id = req.body.id;
    if(!id){
      res.json({ code: 0, data: 'params empty!' });
      return
    }

    try{
      const user = await User.delete(id);
      res.json({ code: 200, data: user})
    }catch(e){
      res.json({ code: 0, data: e })
    }
  },
  renderUserCreate: function(req,res,next) {
    res.render('admin/user_create');
  },
  renderUserEdit: async function(req,res,next) {
    try{
      let id = req.params.id;
      const users = await User.select({ id });
      console.log(users)
      res.locals.user = users[0];
      res.locals.nav = {id};
      res.render('admin/user_edit');
    }catch(e){
      res.locals.error = e;
      res.render('error')
    }
  },

}

module.exports = userController;
