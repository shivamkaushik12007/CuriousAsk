const express = require('express')
const router = express.Router()
const UsersModel = require('./../models/user')
const jwt = require('jsonwebtoken')

const tokenGenerator = (user,email)=>{
    // console.log(user,email);
    const token = jwt.sign(
        { userName:user,
        eMail:email }, 
        "secretKey", {
		algorithm: "HS256",
    })
    return token
}

router.post('/logIn',(req,res)=>{
    UsersModel.logIn(req,(error,response)=>{
        if(error){
            res.send('404')
        }else{
            var token = "";
            if(response.length>0){
                token=tokenGenerator(response[0].userName,response[0].eMail);
            }
            var resp={token:token,resp:response}
            // console.log(resp);
            res.send(resp)
            // console.log(resp);
        }
    })
})

router.post('/addUser',(req,res)=>{
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
})

module.exports = router;