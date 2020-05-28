const express = require('express')
const router = express.Router()
const UsersModel = require('./../models/user')
const bcrypt=require('bcrypt');

router.put('/changePass',async (req,res)=>{
    const user={userName: req.body.userName}
    const userCheck=await UsersModel.findOne(user);
    const valid=await bcrypt.compare(req.body.pass1,userCheck.password)
    if(!valid){ 
        res.statusMessage="Password is wrong. Please enter it correctly";
        res.status('404').end();
    }else{
        UsersModel.changePass(req,userCheck,(error,response)=>{
            if(error){
                res.statusMessage="An error occured try after sometime!";
                res.status('404').end()
            }else{
                res.statusMessage="Password Changed...Enjoy!";
                res.send('password changed')
            }
        })
    }
})


module.exports = router;