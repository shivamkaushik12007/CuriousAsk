const express = require('express')
const router = express.Router()
const UsersModel = require('./../models/user')
const jwt = require('jsonwebtoken')
const {secret}=require('../../config')

const tokenGenerator = (user,email)=>{
    // console.log(user,email);
    const token = jwt.sign(
        { userName:user,
        eMail:email }, 
        secret, {
		algorithm: "HS256",
    })
    return token
}

router.post('/logIn',async (req,res)=>{
    const user={userName: req.body.userName}
    const userCheck=await UsersModel.findOne(user);
    if(!userCheck) return res.status('404').send('user not found');
    UsersModel.logIn(req,userCheck,(error,response)=>{
        if(error){
            res.status('404').send('user not found')
        }else{
            var token = "";
            if(response.length>0){
                token=tokenGenerator(response[0].userName,response[0].eMail);
            }
            var resp={token:token,resp:response}
            res.send(resp)
        }
    })
})

router.post('/addUser',async (req,res)=>{
    const validUserName=await UsersModel.findOne({userName:req.body.userName})
    if(validUserName){ 
        res.status('403').send('This UserName is already in use')
        res.end;
    }else{
        const validEmail=await UsersModel.findOne({eMail:req.body.eMail})
        if(validEmail){
            res.status('403').send('This Email is already in use')
            res.end();
        } else{
            UsersModel.addUser(req,(error,response)=>{
                if(error){
                    res.sendStatus('403')
                }else{
                    var token = "";
                    if(response){
                        token=tokenGenerator(response.userName,response.eMail);
                    }
                    var resp={token:token,resp:response}
                    res.send(resp)
                }
            })
        }
    }
})

module.exports = router;