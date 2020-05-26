const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {saltnum}=require('../../config')

const usersSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    eMail:{
        type:String,
        unique:true,
        required:true
    },
    fName:String,
    lName:String
})

const UsersModel = mongoose.model("Users", usersSchema, "users");

UsersModel.logIn = async function (req,userCheck,callBack) {
    let user = { userName: req.body.userName, password: req.body.password };
    // const pass='$2b$10$5nbQR8hpT3Qc6C87R6Z8JegQFvi4uOUc/Bw.RY18luiZQJkSYs9Su'
    const valid=await bcrypt.compare(req.body.password,userCheck.password);
    if(valid){
        user={userName: req.body.userName,password:userCheck.password}
    }
    UsersModel.find(user, callBack);
    // console.log(user);
}

UsersModel.addUser = async function (req, callBack) {
    // console.log(req.body)
    const salt = await bcrypt.genSalt(saltnum);
    req.body.password = await bcrypt.hash(req.body.password,salt);
    let user = req.body;
    // console.log(user);
    UsersModel.create(user, callBack);
}

module.exports = UsersModel;