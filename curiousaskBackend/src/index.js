const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('./dbConnection');
const user=require('./routes/user');
const passChange=require('./routes/passChange');
const post=require('./routes/post');
const comment=require('./routes/comment');
const {port,secret}=require('../config');

const app = express();
const verifyUser=(req,res,next)=>{ 
    var token = req.body.token;
    if(req.query.token&&req.query.token.length>0){
        token = req.query.token   
    }
    if(!token){
        res.sendStatus('401');
    }else{
        var payload
        try {
            payload = jwt.verify(token, secret,"HS256")
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }
            return res.status(400).end()
        }
        next();
    }
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("*", (req, res, next) => {
    // console.log("Middleware is called");
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "ontent-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "*")
    next();
})

app.use('/user',user);
app.use('/passChange',verifyUser,passChange);
app.use('/post',verifyUser,post);
app.use('/comment',verifyUser,comment);

app.get('/',(req,res)=>res.send('Curious Ask!'));

app.listen(port,()=>console.log('listening'));