const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    const valid=await bcrypt.compare(req.body.password,userCheck.password);
    if(valid){
        user={userName: req.body.userName,password:userCheck.password}
    }
    UsersModel.find(user, callBack);
}

UsersModel.addUser = async function (req, callBack) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
    let user = req.body;
    UsersModel.create(user, callBack);
}

UsersModel.changePass = async function(req,userCheck,callBack){
    let query = { _id: req.body.userId };
    const salt = await bcrypt.genSalt(10);
    userCheck.password = await bcrypt.hash(req.body.pass2,salt);
    UsersModel.updateOne(query, userCheck, callBack);
}
module.exports = UsersModel;