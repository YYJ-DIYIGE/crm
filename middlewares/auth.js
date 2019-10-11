const authcode = require('../utils/authCode.js')
const User = require('./../models/user.js');

var middleAuth = async function(req,res,next){
    res.locals.isLogin = false;
    res.locals.userInfo = {};
     console.log(req.cookies);
    try{
        let token = req.cookies.ac;
        let name = req.cookies.user_name;
        if(!token){
            res.json({
                code:0,
                message:'未登录，请先登录'
            })
            return
        }
        let manageres = authcode(token,'DECODE');
        if(manageres.length<1){
            res.json({
                code:200,
                message:'该管理员账号无效'
            })
            return
        }
        let manager = manageres.split('\t')
        let phone = manager[0];
        let password = manager[1];
        let id = manager[2];
        let role = manager[3]
        res.locals.isLogin = true;
        res.locals.userInfo = {
        phone,password,id,role,name
       }
        let clock = await User.select({phone:manager[0],password:manager[1],id:manager[2]});
        let clockes = clock.length>0;
        if(!clockes){
            res.json({
                code:0,
                message:'该管理员账号不存在'
            })
            return
        }
        next()
    }
    catch(err){
        console.log(err)
        res.json({
            code:0,
            message:'服务器错误'
        })
    }

}


module.exports = middleAuth;