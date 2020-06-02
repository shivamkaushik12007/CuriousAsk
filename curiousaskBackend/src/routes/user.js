const express = require('express')
const router = express.Router()
const UsersModel = require('./../models/user')
const jwt = require('jsonwebtoken')
const {secret}=require('../../config')

const tokenGenerator = (user,email,pass)=>{
    const token = jwt.sign({   
            userName:user,
            eMail:email,
            pass:pass
        }, 
        secret, {
        algorithm: "HS256",
        expiresIn: 7200
    })
    return token
}

router.post('/logIn',async (req,res)=>{
    const user={userName: req.body.userName}
    const userCheck=await UsersModel.findOne(user);
    if(!userCheck){ 
        res.statusMessage="User not found";
        res.status('404').end();
    }else{
        UsersModel.logIn(req,userCheck,(error,response)=>{
            if(error){
                res.statusMessage="An error occured try after sometime!";
                res.status('404').end()
            }else{
                var token = "";
                if(response.length>0){
                    token=tokenGenerator(response[0].userName,response[0].eMail,response[0].password);
                    var resp={token:token,resp:response}
                    res.send(resp)
                }else{
                    res.statusMessage="Password is wrong";
                    res.status('403').end();
                }
            }
        })
    }
})

router.post('/addUser',async (req,res)=>{
    const validUserName=await UsersModel.findOne({userName:req.body.userName})
    if(validUserName){ 
        res.statusMessage="This UserName is already in use";
        res.status('403').end()
    }else{
        const validEmail=await UsersModel.findOne({eMail:req.body.eMail})
        if(validEmail){
            res.statusMessage="This Email Id is already in use";
            res.status('403').end()
        }else{
            UsersModel.addUser(req,(error,response)=>{
                if(error){
                    res.sendStatus('403').end()
                }else{
                    var token = "";
                    if(response){
                        token=tokenGenerator(response.userName,response.eMail,response.password);
                    }
                    var resp={token:token,resp:response}
                    res.send(resp).end();
                }
            })
        }
    }
})

router.get('/checkUser',async (req,res)=>{
    const validUserName=await UsersModel.findOne({userName:req.query.userName})
    if(validUserName){ 
        res.statusMessage="This UserName is already in use";
        res.status('404').end()
    }else{
        res.statusMessage="Good to go!";
        res.send('done').end();
    }
})

module.exports = router;